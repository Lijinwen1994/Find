const express = require('express');
const db = require('../../base/mysql');

module.exports = function () {
  const router = express.Router();


  router.use('/', function (req, res) {
    let {index, loadNumber} = req.query;
    let min = index - loadNumber;
    let max = index;

    let SQL = `select * from resume_table WHERE name is not null limit ${min},${max}`
    db.query(SQL, function (err,data) {
      if(err){
        res.status(500).send(err).end();
      }else {
        if(data.length>0) {
          res.send({result:1,data}).end();
        }else{
          res.send({result:2,msg: '没有数据了'}).end();
        }

      }
    })
  })
return router;
}
