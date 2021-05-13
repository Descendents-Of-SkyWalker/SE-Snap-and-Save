var express = require('express')
var path = require('path')
var dotenv = require('dotenv').config()
var mongo = require('mongodb')
var mysql = require('mysql');
var bodyParser = require('body-parser')


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
app.use(bodyParser.json())


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


app.post("/signup", function(req, res){
  console.log("signup")
  console.log(req.body)
  res.send('ok')
  
})



app.post("/signin", function(req,res){
  console.log("signin")
  console.log(req.body)
  res.send('ok')
})
app.listen(80)