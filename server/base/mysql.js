const mysql = require('mysql');

let db = mysql.createPool({host: 'localhost', user: 'root', password: '123456', database: 'find'});

module.exports =  db;
