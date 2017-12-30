
const express = require('express');
const db = require('../../base/mysql');

module.exports = function () {
  const router = express.Router();
  router.use('/', function (req, res) {
    let {index, loadNumber} = req.query;
    let min = index - loadNumber;
    let max = index;


    let SQL = `select company_info_table.*, company_user_table.tagForeignKey as tag_value
      from company_info_table, company_user_table WHERE company_info_table.foreigKey = company_user_table.ID limit ${min},${max}`
    db.query(SQL, function (err, data) {
      if(err) {
        res.send(err).end();
      }else{
        if(data.length > 0) {
          res.send({result:1, data}).end()
        }else if(data.length ==0){
          res.send({'result':2, msg: '没有数据了'}).end()
        }

      }
    })
  })
  return router
}
