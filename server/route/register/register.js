const express = require('express');
const db = require('../../base/mysql');
const libs = require('../../libs/common');



module.exports = function () {
  var router = express.Router();

  router.post('/', (req, res) => {
      let {name, pass, type} = req.body;
      pass = libs.md5(pass);

      /*
      *个人注册
      * */

      if (type == 1) {

        let regPromise = new Promise((resolve, reject) => {
          db.query(`SELECT userName FROM  personal_user_table WHERE userName='${name}'`, function (err, data) {
            if (err) {
              return reject(err)
            } else {
              return resolve(data)
            }
          })
        })

        regPromise.then((data) => {
          if (data.length > 0) {
            //已注册
            res.send({'result': 2, 'msg': "用户名已注册"}).end();
          } else {
            //未注册
            db.query(`insert into personal_user_table (ID, userName, password,resumeSign) VALUES (0, '${name}', '${pass}','否')`, function (err, data) {
              if (err) {
                console.log(err);
                res.status(500).send('数据库错误').end();
              } else {
                console.log(data)
                res.status(200).send({"result": 1, "msg": "注册成功"}).end();
              }
            })
          }
        })
        //用户名已注册
          .catch((err) => {
            console.log(err)
          })
      }

      /*
      *公司注册
      * */
      else if (type == 2) {
        db.query(`SELECT userName FROM  company_user_table WHERE userName='${name}'`, function (err, data) {
          if (err) {
            console.log('出错了')
            console.error(err);
            throw err
          }
          if (data.length > 0) {
            console.log(data)
            //已注册
            res.send({'result': 2, 'msg': "用户名已注册"}).end();
          } else {
            //未注册
            console.log(data)
            //创建tag_value值
            let uuid = libs.uuid();
            db.query(`insert into tag_table (tag_value, tag_name, tag_type) VALUES ('${uuid}', '${name}', '公司')`,
              function (err, data, fields) {
                if (err) {
                  console.log('tag_table insert error!');
                  console.log(err);
                  res.status(500).send('tag_table insert error!').end();
                } else {
                  db.query(`insert into company_user_table (ID, userName, password, tagForeignKey, companyDataSign) VALUES  (0, '${name}', '${pass}', '${uuid}','否')`, function (err, tags) {
                    db.query()
                  });
                  res.status(200).send({"result": 1, "msg": "注册成功"}).end();
                }
              }
            )
          }
        })
      }
    }
  )
  return router
}



