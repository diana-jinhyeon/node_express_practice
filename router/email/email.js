var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'jinhyeon',
  password: '1234',
  database: 'node_practice'
});

connection.connect();

router.post('/form', function(req, res){
  res.render('email.ejs', {'email': req.body.email});
});

router.post('/ajax', function(req, res){
  var email = req.body;
  console.log(email);
  var responseData = {};

  var query = connection.query('select name from user where email="'+ email + '"', function(err, rows){
    if(err) throw err;
    if(rows[0]) {
      responseData.result = "ok";
      responseData.name = rows[0].name;
    } else {
      responseData.result = "none";
      responseData.name = "";
    }
    res.json(responseData);
  });
});

module.exports = router;
