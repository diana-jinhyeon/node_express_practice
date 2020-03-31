var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var passport = require('passport');
var local_strategy = require("passport-local").Strategy;
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'jinhyeon',
  password: '1234',
  database: 'node_practice'
});

connection.connect();
router.get('/', function(req, res){
  res.render('join.ejs');
});

passport.use('loacl-join', new local_strategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done){
  console.log('local-join callback called');
}));

// router.post('/', function(req, res){
//   var body = req.body;
//   var email = body.email;
//   var name = body.name;
//   var password = body.password;
//
//   var sql = {email: email, name: name, pw: password};
//   var query = connection.query('insert into user set ?', sql, function(err, rows){
//     if(err) throw err;
//     console.log("okay");
//     res.render('welcome.ejs', {
//       'email': email,
//       'name': name,
//       'id': rows.insertId
//     });
//   });
//
// });

module.exports = router;
