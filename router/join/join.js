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
  var msg="hi";
  var errMsg = req.flash('error');
  if(errMsg) msg = errMsg;
  console.log(req);
  res.render('join.ejs', {'message': msg});

});

passport.use('local-join', new local_strategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done){
  var query = connection.query('select * from user where email=?', {email}, function(err, rows){
    if(err) return done(err);
    if (rows.length){
      console.log("exist user");
      return done(null, false, {message: 'your email is already used'});
    } else {

    }
  });
}));


router.post('/', passport.authenticate('local-join',
  {
    successRedirect: '/main',
    failureRedirect: '/join',
    failtureFlash: true
  }
));

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
