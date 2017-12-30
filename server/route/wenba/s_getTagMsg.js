const express = require('express');
const db = require('../../base/mysql');

module.exports = function () {
  const router = express.Router();

  router.use('/', (req, res) => {
    console.log(req.query);
    let {tag_value} = req.query;
    /**
     * [function 获取标签]
     * @param [array] tagsValues [标签values数组]
     *
     * */
    let SQL = `SELECT * FROM tag_table WHERE tag_value = ${tag_value}`;
    db.query(SQL, (err, data) => {
      if (err) {
        res.status(500).send('error:'+err)
      }
      console.log(data)
      res.send({result: 1,tag_name:data[0].tag_name});
    })
  })
  return router;
}
