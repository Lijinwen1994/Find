const express = require('express');
const multer = require('multer');
const db = require('../../base/mysql');
const rename = require('../../libs/loadRename');

module.exports = function () {
  let router = express.Router();

  router.use('/', (req, res) => {
    console.log(req.body)
    let renamed = rename(req.files).then((path) => {
      console.log('图片地址');
      console.log(path)
      let reg = new RegExp(/\\/);
      let index = reg.exec(path).index;
      console.log(path)
      path = path.substring(index, path.length);
      path = 'http://' + req.headers.host + path;
      res.send({result: 1, headImgUrl: path}).end();
    })
  })

  return router;

}

