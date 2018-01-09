const express = require('express');
const rename = require('../../libs/loadRename');

module.exports = function () {
  let router = express.Router();

  router.use('/', (req, res) => {
    rename(req.files).then((path) => {
      let reg = new RegExp(/\\/);
      let index = reg.exec(path).index;
      console.log(index)
      path = path.substring(index, path.length);
      path = 'http://' + req.headers.host + path;
      res.send({result: 1, headImgUrl: path}).end();
    })
  })
  return router;
}

