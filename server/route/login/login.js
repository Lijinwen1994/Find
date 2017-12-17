const express = require('express');
const db = require('../../base/mysql');
const libs = require('../../libs/common');


module.exports = function () {
  let router = express.Router();

  router.post("/", (req, res) => {
    //有自动登录的sessionID
    if(req.session['avoidLoginKey']){
      console.log('执行session')
      console.log(req.session['avoidLoginKey'])
      var {loginName, loginPass, type} =  req.session['avoidLoginKey'];

    }else{
      //没有自动登录的sessionID
      console.log('手动登录')
      var {loginName, loginPass, type, saveFlag} = req.body;
      loginPass = libs.md5(loginPass)
    }
    console.log(loginName)
    console.log(loginPass)

    if(loginName == null || loginPass == null) {
      return;
    }
    /**
     * 个人登录
     * */
    if (type == 1) {
      db.query(`SELECT userName, password , ID as UID, resumeSign FROM personal_user_table WHERE userName='${loginName}'`, function (err, data) {
        let {UID, userName, password, resumeSign} = data[0];
        let type = 1;
        if (err) {
          console.log(err)
          return
        }

        //账号不存在
        if (data.length == 0) {
          res.status(200).send({'result': 2, 'msg': '账号不存在'})
        }

        //密码错误
        else if (loginPass !== password) {
          res.status(200).send({'result': 2, 'msg': '密码错误'})
        }

        //密码正确，登录成功
        else if (loginPass == password) {
          resumeSign = resumeSign == '是' ? true : false;
          let result = {'result': 1, 'msg': '登录成功'}
          let payload = {type, resumeSign, UID, userName, companyDataSign: null};

          //如果没有自动登录的sessionID，就设置session
          if (!req.session['avoidLoginKey'] && saveFlag) {
            req.session['avoidLoginKey'] = {loginName: userName, loginPass:password, type};
            console.log('session设置成功')
            console.log(req.session['avoidLoginKey']);
          }

          res.status(200).send(Object.assign({}, result, payload));
        }
        res.end();
      })
    }

    /**
     * 企业登录
     * */
    else if (type == 2) {

    }

  })

  return router;
}
