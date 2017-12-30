/**
 * [获取二级评论模块]
 * */

const express = require('express');
const db = require('../../base/mysql');

module.exports = function () {
  const router = express.Router();

  router.use('/', (req, res) => {
    console.log('获取二级评论')
    console.log(req.query);
    let {RID, operaUID} = req.query;
    let SQL = `SELECT 
replys_of_replys_table.RORID AS RID,
replys_of_replys_table.content AS c_content,
replys_of_replys_table.n_like AS c_zanNum,
replys_of_replys_table.time,
replys_of_replys_table.RIDForeignKey,
resume_table.headImg AS userAvatar,
personal_user_table.userName,
resume_table.UIDforeignKey AS UID
 from replys_of_replys_table, resume_table, personal_user_table
 WHERE
personal_user_table.ID = replys_of_replys_table.UIDForeignKey 
AND
replys_of_replys_table.UIDForeignKey = resume_table.UIDforeignKey 
AND
replys_of_replys_table.RIDForeignKey = ${RID}`
    db.query(SQL, function (err, data) {
      if(err){
        console.log(err)
      }else{

        res.send({result: 1, data}).end();
      }
    })

  });
  return router;
}
