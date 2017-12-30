const express = require('express');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const multer = require('multer');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const expressStatic =  require('express-static');
const cors = require('cors');
const formidable = require('express-formidable');
const path = require('path');
const staticCache = require('express-static-cache');


const app = express();
const PORT = 4000;
app.listen(PORT, function () {
  console.log(`server is listen ${PORT}`);
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(multerObj.any());

const db=mysql.createPool({host: 'localhost', user: 'root', password: '123456', database: 'find'});
//设置跨域访问
// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:8080");
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With")
//   next();
// });

var corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
  maxAge: '1728000'
  //这一项是为了跨域专门设置的
}
app.use(cors(corsOptions))
//设置跨域


var keys = [];
app.use(cookieParser('sdsfgsdixchuifhsaf'));
(function () {
  for(var i = 0; i < 100000; i++) {
    keys[i] = 'a_' + Math.random();
  }
  app.use(cookieSession({
    name: 'sess_id',
    keys: keys,
    maxAge: 24*60*60*1000*30  //30day
  }))
})();



//
// any() 表示接受任何文件， single(‘表单name’)接受一个指定formname文件。dest指定上传的文件保存在哪里
app.use( multer({dest: './static/upload'}).any());
// app.use(formidable({
//   uploadDir: './www/upload',
//   multiples: true
// }))

app.use('/', function (req, res, next) {
  console.log(req.path)
  next();
})

/**
 * [注入注册模块]
**/
app.use('/register', require('./route/register/s_register')());

/**
 * [注入登录模块]
 * */
app.use('/login', require('./route/login/s_login')());

/**
 * [登录注销模块]
 * */
app.use('/cancellation', require('./route/login/s_cancellation')());

/**
 * [头像上传模块]
 * */
app.use('/headLoad', require('./route/upload/s_headLoad')());

/**
 * [简历提交模块]
 * */
app.use('/resumeSubmit', require('./route/resume/s_resumeSubmit')());

/**
 * [获取简历模块]
 * */
app.use('/getresumedata', require('./route/resume/s_getResumeData')());

/**
 * [提交公司表单数据]
 * */
app.use('/companySubmit', require('./route/compamy/s_companySumbit')());


/**
 * [获取公司标签]
 * */
app.use('/getTag', require('./route/wenba/s_getTag')());

/**
 * [保存话题]
 * */
app.use('/saveTopic', require('./route/wenba/s_saveTopic')())

/**
 * [获取问吧首页信息]
 * */
app.use('/topicList_all', require('./route/wenba/s_topiclist_all')());

/**
 * [根据标签，获取对应的话题]
 * */
app.use('/topicList_tag', require('./route/wenba/s_topiclist_tag')());

/**
 * [获取详细页数据]
 * */
app.use('/topicDetail', require('./route/wenba/s_topicDetail')());

/**
 * [回复话题，一级评论]
 * */
app.use('/sendTopicReply', require('./route/wenba/s_sendTopicReply')());


/**
 * [获取二级评论]
 * */
app.use('/getSecondaryReply', require('./route/wenba/s_getSecondaryReply')());

/**
 * [获取二级评论]
 * */
app.use('/sendSecondaryReply', require('./route/wenba/s_sendSecondaryReply')());

/**
 * [点赞]
 * */
app.use('/zan', require('./route/wenba/s_zan')());


/**
 * [获取标签信息] [更具tag_value值]
 * */
app.use('/getTagMsg', require('./route/wenba/s_getTagMsg')());

/**
 * [获取标签信息] [更具tag_value值]
 * */
app.use('/workerInfo', require('./route/resume/s_getResume_all')());

/**
 * [获取公司信息列表数据]
 * */
app.use('/companyListData', require('./route/compamy/s_getCompanyList')());


/**
 * [静态资源]
 * */
app.use(expressStatic("./static"));
