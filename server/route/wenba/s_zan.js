const express = require('express');
const db = require('../../base/mysql');

module.exports = function () {
  const router = express.Router();

  router.use('/', function (req, res) {
    console.log(req.query)
    let {RID, c_type,TID, UIDOfReply,operaUID}= req.query;

    /**
     * [处理一级评论点赞]
     */
    if(c_type == 'first') {
      let SQL = `UPDATE replys_table SET replys_table.n_like = n_like + 1 WHERE RID = ${RID}`
      db.query(SQL,(err)=> {
        if(err) {
          res.status(500).send(err).end();
        }else{
          res.send({result: 1}).end();
        }
      })
    }

    /**
     * [处理二级评论点赞]
     */
    else if(c_type == 'second') {
      let SQL = `UPDATE replys_of_replys_table SET n_like = n_like + 1 WHERE RORID = ${RID}`
      db.query(SQL,(err)=> {
        if(err) {
          res.status(500).send(err).end();
        }else{
          res.send({result: 1}).end();
        }
      })
    }
  })
  return router;
}
