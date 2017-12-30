const express = require('express');
const db = require('../../base/mysql');
const libs = require('../../libs/common');

module.exports = function () {
  const router = express.Router();

  router.use('/', (req, res) => {
    let {TID, operaUID, content} = req.body.params;
    if (operaUID == "") {
      res.send({result: 2, msg: '兄弟，请先登录'}).end();
      return;
    }

    let time = libs.getTimeString();


    /**
     * [function 获取回复用户数据]
     * @param [string] UID [用户UID]
     * */
    let getUserInfo = function(UID) {
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
     * [function 数据库写入评论]
     *
     * */
    let insert = function () {
      return new Promise((resolve, reject) => {
        let RID = libs.uuid();
        let timestamp = new Date();
        let SQL = 'INSERT INTO replys_table (RID,content, time,n_like,timestamp, UIDForeignKey, TIDForeignKey) VALUE (?,?,?,?,?,?,?)';
        let values = [RID,content, time, 0, timestamp,operaUID, TID];
        db.query(SQL, values, function (err, data) {
          if (err) {
            return reject(err);
          } else {
            return resolve(RID)
          }
        })
      })

    }


    async function asyncAssembly() {
      let insertPromise = insert();
      let RID = await insertPromise;
      if (RID) {
        let userInfo = await getUserInfo(operaUID);
        return Object.assign(userInfo, {RID});
      }
    }



    asyncAssembly().then((userData) => {
      let {userNameOfReply,userAvatar,UIDOfReply,RID} = userData[0];
      let ret = Object.assign({}, {result:1},{
        TID,
        RID,
        userAvatar,
        userName:userNameOfReply,
        UID: operaUID,
        c_content: content,
        time,
        commentNum: 2
      })
      res.send({result: 1, data: ret}).end();
    }).catch((err) => {
      res.send('insert replys_table error, message:'+err).end();
    })


  })
  return router;
}
