const express = require('express');

module.exports = function () {
  let router = express.Router();
  router.post('/', (req, res) => {
    if(req.session['avoidLoginKey']) {
      delete req.session['avoidLoginKey'];
      res.send({'result':1,'msg': '删除成功'})
    }
  })
  return router
}
