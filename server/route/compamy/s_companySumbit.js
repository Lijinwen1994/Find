const express = require('express');
const db = require('../../base/mysql');

module.exports = function () {
  const router = express.Router();

  router.use('/', function (req, res) {
    console.log(req.body)
    let {name, foundTime, foundFund, financingStage, isListed, peopleNumber, siteProv, siteCity, point, address, intro, culture, headImg} = req.body.params.data;
    let {uid, type} = req.body.params;
    point = JSON.stringify(point);
    /**
     * [function 搜索查看是否有数据]
     * @return [boolean] true/false [有数据/ 没数据]
     * */
    let select = function () {
      return new Promise((resolve, reject) => {
        let SQL = `select ID from company_info_table where foreigKey ='${uid}'`;
        db.query(SQL, function (err, data) {
          if (err) {
            return reject(err)
          }
          return resolve(data.length > 0)

        })
      })

    }

    /**
     * [function 插入]
     * @return [promise boolean] true [插入成功]
     * */
    let insert = function () {
      return new Promise((resolve, reject) => {
        let SQL = `INSERT INTO company_info_table (ID,name,foundTime,foundFund,financingStage,isListed,peopleNumber,siteProv,siteCity,point,address,intro,culture,headImg,foreigKey) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        //14个
        let values = [0,name, foundTime, foundFund, financingStage, isListed, peopleNumber, siteProv, siteCity, point, address, intro, culture, headImg, uid];
        console.log(typeof point)
        db.query(SQL, values, (err, data)=> {
          if (err) {
            return reject(err)
          }
          return resolve(true)
        })
      })
    }

    /**
     * [function 更新]
     * @return [Promise][Boolean] true [更新成功]
     * */
    let update = function () {
      return new Promise((resolve, reject) => {
        let SQL = `UPDATE company_info_table SET 
        name=?,foundTime=?,foundFund=?,financingStage=?,isListed=?,peopleNumber=?,siteProv=?,siteCity=?,point=?,address=?,intro=?,culture=?,headImg=? 
        WHERE foreigKey=?`;
        let values = [name, foundTime, foundFund, financingStage, isListed, peopleNumber, siteProv, siteCity, point, address, intro, culture, headImg,uid];
        db.query(SQL,values,(err, data)=> {
          if(err) {
            return reject(err)
          }
          return resolve(true)
        })
      })
    }

    let updateCompantSign = function () {
      let SQL = `UPDATE company_info_table SET companyDataSign='是' WHERE ID='${uid}'`;

      db.query(SQL, function (err) {
          if (err) {
            throw new Error('update resumeSign Error');
          }
          console.log('标志位修改完成')
        }
      )
    }

    /**
     * [async 创建async函数]
     * */
    async function asyncSetCompanyData() {
      let ret = await select();
      if (ret) {
        return await update()
      } else {
        return await insert();
      }
    }

    asyncSetCompanyData().then(() => {
      res.send({'result': 1}).end();
    }).catch((err) => {
      console.log(err)
    })
  })

  return router;
}
