/**
 * [处理保存二级评论模块]
 * */

const express = require('express');
const db = require('../../base/mysql');
const libs = require('../../libs/common');
const checkLogin = require('../../libs/checkLogin');

module.exports = function () {
  const router = express.Router();


  router.use('/', (req, res) => {
    if(req.query.operaUID == '') {
      res.send({result:2, msg: '大哥，登录后再评论呗'})
    }
    console.log(req.query)
    let {RID, operaUID, content} = req.query;
    let RORID = libs.uuid(),
      time = libs.getTimeString();

    let insert = function () {
      return new Promise((resolve, reject) => {
        let SQL = `INSERT INTO replys_of_replys_table (RORID, time,content,n_like, RIDForeignKey, UIDForeignKey) VALUE (?,?,?,?,?,?)`;

        let values = [RORID, time, content, 0, RID, operaUID];
        db.query(SQL, values, function (err) {
          if (err) {
            return reject(err);

          } else {

            return resolve(true);
          }
        })
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
          console.log(UID)
          return resolve(data)
          // retUserInfo.push(data);
        })
      })
    }


    // insert()
    //   .then(()=> {
    //
    //     res.send({result: 1, data: []}).end();
    // })
    //   .catch(()=> {
    //
    // })

    async function aysncAssembly() {
      let insertPromise = insert();
      let getUserInfoPromise = getUserInfo(operaUID);

      let insertResult = await insertPromise;
      let userInfo = await getUserInfoPromise
      if(insertResult) {
        return userInfo
      }
    }

    aysncAssembly()
      .then((userInfo)=> {
      console.log(userInfo)
      let {userNameOfReply, userAvatar, UIDOfReply} = userInfo[0];
      let retData = {
        RID: RORID,
        userAvatar,
        userName:userNameOfReply,
        UID: UIDOfReply,
        c_content: content,
        c_zanNum: 0,
        time
      }
      let data = [retData];
      res.send({result: 1, data}).end();
    }).catch((err) => {
      console.log(err)
      res.send('error message:'+err).end();
    });

  });
  return router;
}
