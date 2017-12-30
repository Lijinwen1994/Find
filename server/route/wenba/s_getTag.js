const express = require('express');
const db = require('../../base/mysql');

module.exports = function () {
  const router = express.Router();

  router.use('/', function (req, res) {
    let {TagStr} = req.query;
    TagStr = decodeURIComponent(TagStr);
    console.log(TagStr);
    db.query(`SELECT tag_value, tag_name, tag_type FROM tag_table WHERE tag_name like'%${TagStr}%'` , function (err, data) {
      if(err) {
        console.log(err)
        return;
        // res.status(500).send('search Tag error').end();
      }else{
        res.send({'result': 1, data: data}).end();
      }

    })

  });

  return router;
}
