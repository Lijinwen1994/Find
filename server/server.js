const express = require('express');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const multer = require('multer');
const multerObj = multer({dest: './static/upload'});
const mysql = require('mysql');
const bodyParser = require('body-parser');
const expressStatic =  require('express-static');
const expressSession = require('express-session');
const cors = require('cors');

var app = express();
const PORT = 4000;
app.listen(PORT, function () {
  console.log(`server is listen ${PORT}`);
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(multerObj.any());

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

app.use('/', function (req, res, next) {
  console.log(req.path)
  // if(req.session['avoidLoginKey']){
  //   let {password, userName,type} = req.session['avoidLoginKey'];
  //   req.password = password;
  //   req.userName = userName;
  //   req.type = type;
  //   req.redirect('/login')
  // }
  next();
})


app.use('/register', require('./route/register/register')());
app.use('/login', require('./route/login/login')());

app.use(expressStatic("./static"));
