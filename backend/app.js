var express = require('express')
var path = require('path')
var dotenv = require('dotenv').config()
var mysql = require('mysql');
var bodyParser = require('body-parser');


var app = express()
app.use(bodyParser());

var con = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

con.query("USE snapSave", function (err, result) {
  if (err) throw err;
  console.log("Result: " + result);
});

app.use(express.static(path.join(__dirname,'../')))

app.get('/', function(req,res){
    console.log('kul ')
    res.sendFile(path.join(__dirname, '../index_login_signup.html'));
    
  })


app.post("/signup", function(req, res){
  var uid
  console.log("signup")
  console.log(req.body)
  con.query(`select *from user ORDER BY uid DESC LIMIT 1;`, function (err, result) {
    if (err) throw err;
    uid = Number(result[0].uid) + 1
    console.log(uid)
  });
  var query = `SELECT * FROM user where (email = "${req.body.email}");`
  con.query(query, function (err, result, fields) {
    if (err) throw err;
    if(result.length != 0){
      res.send('email already registered')
      return
    }
    var query = `INSERT INTO user VALUES (${uid}, "${req.body.name}", "${req.body.email}", "${req.body.password}");`
    con.query(query, function (err, result) {
      if (err) throw err;
      console.log(result);
      res.sendFile(path.join(__dirname, '../index_main.html'))
    });
  });
})



app.post("/signin", function(req,res){
  console.log("signin")
  console.log(req.body)
  var query = `SELECT * FROM user where (email = "${req.body.email}" and password = "${req.body.password}");`
  con.query(query, function (err, result, fields) {
    if (err) throw err;
    console.log(result)
    if(result.length == 0){
      res.send('wrong credentials')
      return
    }
    res.sendFile(path.join(__dirname, '../index_main.html'))

  });
})
app.listen(80)