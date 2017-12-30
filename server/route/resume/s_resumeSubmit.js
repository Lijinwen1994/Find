const express = require('express');
const db = require('../../base/mysql');


module.exports = function () {
  const router = express.Router();

  router.use('/', (req, res) => {
    console.log(req.body)
    //解构参数
    let {data, uid, type} = req.body.params;
    let {name, degree, school, job, age, projectEx, experienceYear, wantSaraly, headImg} = data;
    projectEx = JSON.stringify(projectEx);

    /**
     * [function select准备插入的值是否存在于表中] [存在就update, 不存在insert into]
     * @param [NULL] [desc]
     * @return [Promise][Boolean]  true / false [有数据 / 没数据]
     * */
    let select = function () {
      return new Promise((resolve, reject) => {
        let SQL = 'SELECT `UIDforeignKey` FROM `resume_table` WHERE(UIDforeignKey = ?)';
        let values = [uid];
        //select 搜索有没有值，有值就更新，没值就插入。
        db.query(SQL, values, function (err, data) {
          if (err) {
            return reject(err)
          } else {
            return resolve(data.length > 0);
          }
        })
      })
    }

    /**
     * [function 更新]
     * @return [Promise][Boolean] true [更新成功]
     * */
    let update = function () {
      return new Promise((resolve, reject) => {
        let SQL = `UPDATE resume_table SET
        name=?, degree=?, school=?, job=?, age=?,projectEx=?, experienceYear=?, wantSaraly=?, headImg=?
        WHERE
        UIDforeignKey =?`;

        let values = [name, degree, school, job, age, projectEx, experienceYear, wantSaraly, headImg, uid];

        db.query(SQL, values, (err, data) => {
          if (err) {
            return reject(err)
          } else {
            return resolve(true)
          }
        })

      })
    }

    /**
     * [function 插入]
     * @return [Promise][Boolean] true [插入成功]
     * */
    let insert = function () {
      return new Promise((resolve, reject) => {
        let SQL = `INSERT INTO resume_table
        (ID,name, degree, school, job, age,projectEx, experienceYear, wantSaraly, headImg, UIDforeignKey)
        VALUE
        (?,?,?,?,?,?,?,?,?,?,?)`;
        let values = [0, name, degree, school, job, age, projectEx, experienceYear, wantSaraly, headImg, uid];
        degree = degreeArr[parseInt(degree)];
        console.log(degree)
        db.query(SQL, values, (err, data) => {
          if (err) {
            return reject(err)
          } else {
            //修改简历标志位
            updateResumeSign();
            return resolve(true)
          }
        })
      })
    }

    /**
     * [function 第一个插入简历表，插入后修改简历标志位为true]
     * */
    let updateResumeSign = function () {
      let SQL = `UPDATE personal_user_table SET resumeSign='是' WHERE ID='${uid}'`;

      db.query(SQL, function (err) {
          if (err) {
            throw new Error('update resumeSign Error');
          }
          console.log('标志位修改完成')
        }
      )
    }

    async function asyncSetResume() {
      let order = await select();
      if (order) {
        //有数据
        return await update()
      } else {
        //没数据
        return await insert()
      }
    }

    asyncSetResume()
      .then(() => {
        res.send({'result': 1}).end();
        db.release();
      })
      .catch((err) => {
       res.status(500).send({'result':2}).end();
      });


  })
  return router;
}
