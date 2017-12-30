const express = require('express');
const db = require('../../base/mysql');

module.exports = function () {
  const router = express.Router();

  router.use('/', function (req, res) {
    let {type, uid} = req.query;

    if(type == 1) {
      let SQL = `SELECT name, degree, school, job, age,projectEx, experienceYear, wantSaraly, headImg FROM resume_table WHERE UIDforeignKey='${uid}'`;

      db.query(SQL, function (err, data) {
        if(err) {
          console.log(err)
          res.status(500).send('select resume data error').end();
        }else{
          console.log(data);
          if(!data[0].projectEx) {
            data[0] = Object.assign(data[0], {projectEx: []});
          }
          console.log('-----');
          console.log(data);
          res.json(data).end();
        }
      })

    }else{
      res.send('user type error').end();
    }
  })
  return router;
}
