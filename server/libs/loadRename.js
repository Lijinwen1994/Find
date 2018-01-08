const pathLib = require('path');
const fs = require('fs');

/**
 * [function 重命名上传的图片] [multer上传图片后文件名没有后缀，需要手动添加]
 *
 * @params [{type}] files [req.files对象]
 * @return []
 * */
module.exports = function (files) {
  console.log(files[0]);
  let newName = files[0].path + pathLib.parse(files[0].originalname).ext;
  return new Promise((resolve, reject) =>{
    fs.rename(files[0].path, newName, function (err) {
      if(err) {
        return reject()
      }else{
        return resolve(newName)
      }
    })
  })
}
