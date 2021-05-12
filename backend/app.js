var express = require('express')
var path = require('path')
var dotenv = require('dotenv').config()
var mongo = require('mongodb')
var mysql = require('mysql');


var url = "mongodb://localhost:27017/mydb";

mongo.MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  // var dbo = db.db("mydb")
  // dbo.createCollection("customers", function(err, res) {
  //   if (err) throw err;
  //   console.log("Collection created!");
  // })
  db.close();
});

var app = express()


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sudo enter"
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

app.get("/signin", function(req,res){
  res.sendFile(path.join(__dirname,'../signin.html'))
})

app.get("/signup", function(req,res){
  res.sendFile(path.join(__dirname,'../signup.html'))
})
app.post("/signup", function(req, res){
  console.log("helo")
  if(req.body.password != req.body.cpassword){
    res.send("password and confirm password do not match")
    // res.sendFile(path.join(__dirname,'../signup.html'))
  }
  else{
    console.log("signup")

  }
})



app.post("/signin", function(req,res){
  // sql = 'SELECT * FROM user where (name = "' + req.body.username + '" and password = "' +req.body.password + '");'
  //   con.query(sql, function (err, result) {
  //     if (err) throw err;
  //     console.log("Result: " + result);
  //   });
  console.log(req)
})
app.listen(80)