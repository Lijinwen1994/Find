/**
 * [返回问吧首页信息]
 * */

const express = require('express');
const db = require('../../base/mysql');

module.exports = function () {
  const router = express.Router();
  router.use('/', function (req, res) {
    let {index, loadNumber} = req.query;
    let min = index - loadNumber;
    let max = index;

    let topicData = [];
    let retTags = [];
    let retUserInfo = [];
    let retReplys = [];

    /**
     * [function 获取话题]
     * @return [{object}] object [话题数据]
     * */
    let getTopic = function () {
      return new Promise((resolve, reject) => {
        let SQL = `SELECT TID, tags, title, content, views, post_time,UIDForeignKey FROM topic_table limit ${min},${max}`;
        db.query(SQL, function (err, data) {
          if(err) {
            return reject( new Error('select topictable error .message:'+ err));
          }
          return resolve(data)
        })
      })
    }

    /**
     * [function 获取标签]
     * @param [array] tagsValues [标签values数组]
     *
     * */
    let getTags = function (tagsValues) {
      return new Promise((resolve, reject)=> {
        var ret = [],
            i = 0,
            len= tagsValues.length;

        for(i; i < len; i++) {
          (function (tagvalue, i) {
            db.query(`SELECT tag_value, tag_name from tag_table where tag_value='${tagvalue}'`, function (err, data) {
              if(err) {
                return reject(err)
              }
              ret.push((data[0]));
              if(i == len - 1) {
                retTags.push(ret)
                return resolve(retTags)
              }
            })
          })(tagsValues[i], i)

        }
      })
    }

    /**
     * [function 获取回复用户数据]
     * @param [string] UID [用户UID]
     * */
    function getUserInfo(UID) {
      // return new Promise((resolve, reject) => {
        let SQL = `SELECT 
		personal_user_table.userName as userNameOfReply,
		resume_table.headImg as userAvatar,
		personal_user_table.ID as UIDOfReply
    FROM
	  personal_user_table,
	  resume_table
    WHERE 
    personal_user_table.ID = resume_table.UIDforeignKey
    AND
    personal_user_table.ID = '${UID}'`;

        db.query(SQL, (err, data) => {
          retUserInfo.push(data);
        })
      // })
    }

    /**
     * [function 获取当前话题下点赞数量最多的回复信息]
     * @param [string] TID [话题TID]
     * */
    let getReplys =  function(TID) {
      let SQL = `SELECT replys_table.* FROM replys_table,topic_table WHERE replys_table.TIDForeignKey = topic_table.TID and TIDForeignKey = ${TID} order by n_like desc limit 0,1`;
      db.query(SQL, function (err, data) {
        if(err) {
          console.log(err)
        }
        retReplys.push(data)
      })
    }

    async function asyncAssembly() {
      topicData = await getTopic();
      if(topicData.length == 0) {
        res.send({'result':2, msg: '已经到达底线了'}).end();
        return
      }
       await topicData.forEach(async (item, i) => {
        let {TID, tags,UIDForeignKey} = item;
          getTags(JSON.parse(tags));
          getUserInfo(UIDForeignKey);
          getReplys(TID)
      })
    }

    let getreplyNumArray = [];
    /**
     * 获取对应话题回复数量 [未使用]
     * @param TID
     */
    let getreplyNum = function (TID) {

      let SQL = `SELECT count(*) as replyNumber from replys_table where TIDForeignKey='${TID}'`;
      db.query(SQL, (err,data)=> {
        if(err){
          console.log(err)
          getreplyNumArray.push(0);
        }else {
          getreplyNumArray.push(data[0].replyNumber);
        }
      })
    }

    asyncAssembly().then((data)=> {
        let finalyData = []
        Assembly();
        function Assembly() {
          setTimeout(()=> {
            if(retTags.length && retUserInfo.length && retReplys.length) {
              topicData.forEach((item, i) => {
                let {TID, title,UIDForeignKey} = item;

                let {userNameOfReply, userAvatar, UIDOfReply} = retUserInfo[i][0];
                let replyData = {};
                let tagData = [];

                //处理评论数据
                if(retReplys[i][0]){
                  var {RID, content, time, n_like} = retReplys[i][0];
                  replyData = Object.assign({}, {RID}, {replyContent:content,userAvatar,userNameOfReply,UIDOfReply,time}, {c_zanNum:n_like},{commentNum:0})
                }

                //处理标签数据
                for(let j = 0, taglen = retTags[i].length; j <taglen;j++) {
                  let {tag_value, tag_name} = retTags[i][j];
                  tagData.push({tag_name, tag_value});
                }

                let retObject = {};
                retObject = Object.assign({}, {
                  title,
                  TID,
                  UIDOfOwn:UIDForeignKey,
                    replyNum:getreplyNumArray[i]
                },
                  {replyData},
                  {tags: tagData}
                )
                finalyData.push(retObject)
              })

              res.send({'result': 1, 'data': finalyData}).end();
            }else{
              Assembly();
            }
          },40)
        }

    })

  });

  return router;
}
