var express = require('express')
var path = require('path')
var dotenv = require('dotenv').config()
var mysql = require('mysql');
var bodyParser = require('body-parser');
var multer = require('multer')
var fs = require('fs')
var bcrypt = require('bcrypt')

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
  if(!validate(req.body)){
    res.send("please check the data you have entered")
    console.log("validation failed")
    return
}
  console.log("signup")
  console.log(req.body)
  if(req.body.password!= req.body.rpassword){
    res.send("password and confirm password do not match")
    return
  }
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
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) throw err;
      var query = `INSERT INTO user VALUES (${uid}, "${req.body.fname}", "${req.body.email}", "${hash}");`
      con.query(query, function (err, result) {
      if (err) throw err;
      console.log(result);
      res.sendFile(path.join(__dirname, '../index_main.html'))
    });
    });
    
  });
})



app.post("/signin", function(req,res){
  if(!req.body.email.match(emailRegex)){
    res.send("please check the data that you have entered")
    console.log("validation failed")
    return
  }
  console.log("signin")
  console.log(req.body)
  var query = `SELECT * FROM user where (email = "${req.body.email}");`
  con.query(query, function (err, result, fields) {
    if (err) throw err;
    console.log(result)
    if(result.length == 1){
      if(result[0].email == req.body.email){
        bcrypt.compare(req.body.password, result[0].password, function(err, ans) {
          if(ans)
          res.sendFile(path.join(__dirname, '../index_main.html') , function(){console.log("sent")})
          else
          res.send("check credentials")
        });
        
      }
    }
    else if(result.length == 0)
      res.send('invalid credentials')
  })
})

// var upload = multer({ dest: 'upload/'});
// var type = upload.single('myfile');

// app.post('/upload', function (req,res) {

  // /** When using the "single"
  //     data come in "req.file" regardless of the attribute "name". **/
  // var tmp_path = req.file.path;

  // /** The original name of the uploaded file
  //     stored in the variable "originalname". **/
  // var target_path = 'uploads/' + req.file.originalname;

  // /** A better way to copy the uploaded file. **/
  // var src = fs.createReadStream(tmp_path);
  // var dest = fs.createWriteStream(target_path);
  // src.pipe(dest);
  // src.on('end', function() { res.render('complete'); });
  // src.on('error', function(err) { res.render('error'); });
//   console.log(req.file)
// });


app.listen(80)

var nameRegex = /^[a-z ,.'-]+$/i
var phoneRegex = /^[0-9]{10}$/
var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

function validate(data){
  if (!data.fname.match(nameRegex)){
      return false
  }
  else if(!data.email.match(emailRegex))
      return false
  else if(isNaN(data.number) || !data.number.match(phoneRegex))
      return false
  else
      return true
}