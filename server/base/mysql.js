const mysql = require('mysql');

let db = mysql.createPool({host: 'localhost', user: 'root', password: '123456', database: 'find'});

module.exports =  db;

//本地密码： 123456
//腾讯云服务器密码：TcgH50Jl25BY
