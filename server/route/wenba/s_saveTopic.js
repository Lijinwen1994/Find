/**
 * [保存话题]
 * */

const express = require('express');
const db = require('../../base/mysql');
const libs  = require('../../libs/common');
module.exports = function() {
  const router = express.Router();

  router.use('/', function (req, res) {
    let {userUid, userType, tagValues, title, content}= req.body;
    if(userUid == '') {
      res.send({'result':2, 'msg': '请登录'}).end();
      return
    }
    if(userType !== 1) {
      res.send({'result':2, 'msg': '个人用户才可以发布信息'}).end();
      return
    }

    tagValues = JSON.stringify(tagValues);
    let post_time =libs.getTimeString();
    let timestamp = new Date();
    let SQL = 'INSERT INTO topic_table (tags, title, content, views, post_time, UIDForeignKey,timestamp) VALUE (?,?,?,?,?,?,?)';
    let values = [tagValues, title, content, 0, post_time, userUid,timestamp];
    db.query(SQL, values, (err, data)=> {
      if(err) {
        res.status(500).send('save Topic error' + err).end();
      }
        res.send({result: 1, msg:'话题发布成功'}).end();
    })
  })

  return router;
}
