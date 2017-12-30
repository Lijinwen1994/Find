/**
 * [返回话题详细页数据]
 * */
const express = require('express');
const db = require('../../base/mysql');
const _ = require('lodash');

module.exports = function () {
  const router = express.Router();

  router.use('/',(req,res)=> {
    console.log(req.query)
    let {TID} = req.query;

    let topicData = [];
    let retTags = [];
    let retUserInfo = [];
    let retReplys = [];

    /**
     * [function 获取话题]
     * @return [{object}] object [话题数据]
     * */
    let getTopic = function () {
      return new Promise((resolve,reject) => {
        let SQL = `SELECT * FROM topic_table WHERE TID = '${TID}'`;
        db.query(SQL, (err, data)=> {
          if(err) {
            return reject( new Error('select topictable error .message:'+ err));
          }
            return resolve(data);
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
      return new Promise((resolve, reject) => {
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
          if(err) {
            return reject(err)
          }
          return resolve(data)
          // retUserInfo.push(data);
        })
      })
    }

    /**
     * [function 获取回复信息]
     * @param [string] TID [话题TID]
     * */
    let getReplys =  function(TID) {

      let SQL = `SELECT replys_table.*,resume_table.headImg as userAvatar, personal_user_table.userName
                  FROM replys_table,topic_table, resume_table,personal_user_table
                  WHERE 
                  replys_table.TIDForeignKey = topic_table.TID 
                  AND
                  resume_table.UIDforeignKey = personal_user_table.ID
                  AND
                  replys_table.UIDForeignKey = personal_user_table.ID
                  AND 
                  topic_table.TID= ${TID} 
                  ORDER BY replys_table.\`timestamp\``;
      return new Promise((resolve, reject)=> {
        db.query(SQL, function (err, data) {
          if(err) {
            return reject(err);
          }
          resolve(data);
        })
      })

    }


    async function asyncAssembly() {
      topicData = await getTopic();
      let {TID, tags,UIDForeignKey, content, title, views, post_time} = topicData[0];

      //获取标签信息
      let tagsPromise = getTags(JSON.parse(tags));

      //获取用户信息
      let userInfoPromise = getUserInfo(UIDForeignKey);

      //获取评论信息
      let replyPromise = getReplys(TID);


      retUserInfo =  await userInfoPromise;
      retTags = await tagsPromise;
      retReplys = await replyPromise;

      //返回数据分3部分，结果信息，话题数据，评论数据，
      // 现在组装话题数据，
      // 标签数组需要扁平化处理
      let finallyTopicData = {
        TID,
        tags: _.flattenDeep(retTags),
        title,
        content,
        views,
        UID:UIDForeignKey
      };

      //处理评论的数据

      let finallyReplyData = [];
      retReplys.forEach((item, i)=> {
        let {userAvatar, userName,RID,n_like,time} = retReplys[i];
        finallyReplyData.push({
          RID,
          TID,
          userAvatar,
          userName,
          UID:UIDForeignKey,
          c_content:retReplys[i].content,
          c_zanNum: n_like,
          commentNum: 1,
          time
        })
      })


      return {topic:finallyTopicData, replys: finallyReplyData};
    }

    asyncAssembly().then((data)=> {
      let {topic,replys} = data;

      res.send({result:1, topic,replys}).end();
    }).catch((err) =>{
      res.status(500).send('getTopiDetail message：'+err).end();
    });



  })


  return router;
}
