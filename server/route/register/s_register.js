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
        /**
         * [搜索用户是否注册过]
         * */
        let p_Select = function () {
          return new Promise((resolve, reject)=> {
            db.query(`SELECT userName FROM  personal_user_table WHERE userName='${name}'`, function (err, data) {
              if (err) {
                return reject(err)
              } else {
                return resolve(data.length>0)
              }
            })
          })
        }

        /*
        * [插入个人用户信息表]
        * */
        let p_insertPersonal = function () {
          return new Promise((resolve, reject)=> {
            //未注册
            db.query(`insert into personal_user_table (ID, userName, password,resumeSign) VALUES (0, '${name}', '${pass}','是')`, function (err, data) {
              if (err) {
                console.log(err);
                return reject(err);

              } else {
                return resolve(true)

              }
            })
          })
        }

        /**
         * [获取用户ID]
         * @return {Promise}
         */
        let getUID = function () {
          return new Promise((resolve, reject)=> {
            db.query(`SELECT ID FROM personal_user_table WHERE userName = '${name}' AND password = '${pass}'`, function (err, data) {
              if(err){
                return reject(err)
              }else{
                return resolve(data[0])
              }
            })
          })
        }

        /**
         * [插入用户简历表格]
         * @param UID [type=string] [用户UID]
         * @return {Promise}
         */
        let p_insertResume = function (UID) {
          return new Promise((resolve, reject)=> {
            let SQL = `insert into resume_table(headImg, UIDforeignKey) VALUE (?,?)`;
            let values = ['https://img.kanzhun.com/images/activity/20170502/d7a2917a29514e85e2a14b721f2b11d3.png', UID];
            db.query(SQL, values, function (err, data) {
              if(err) {
                return reject(err)
              }
              return resolve(true)
            })
          })
        }

        async function async_personal_register() {
          let selectRet = await p_Select();

          //大于0，true为已注册
          if(selectRet) {
            res.send({'result': 2, 'msg': "用户名已注册"}).end();
          }else {
            let p_insertPersonalRet = await p_insertPersonal();
          }

          let userUId = await getUID();
          console.log(userUId);
          return await p_insertResume(userUId.ID);
        }

        async_personal_register().then(()=> {
          res.status(200).send({"result": 1, "msg": "注册成功"}).end();
        }).catch((err)=> {
          console.log(err);
          res.status(500).send('数据库错误'+err).end();
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



