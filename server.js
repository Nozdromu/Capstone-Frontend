'use strict';

///////////////////////////////////////////////////////////////////////////
// requires

var path = require('path');
var express = require('express');
var mysql = require('mysql');
var sqlconfig = require('./sqlconfig.json');
var cookieSession = require('cookie-session')
var session = require('express-session')
const fs = require('fs')



////////////////////////////////////////////////////////////////////////////

var app = express();


////////////////////////////////////////////////////////////////////////////
// mysql connection script
var allitem;
var con;

var usemysql = false;

if (usemysql) {
  con = mysql.createConnection(sqlconfig);
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });
  con.query("call Alldata", function (err, result, fields) {
    if (err) throw err;

    allitem = result;
    allitem[0].forEach(element => {
      element.list = result[1].filter(e => e.itid == element.itid);
    });
  })
}else{
  allitem=require('./alldata.json')
}




////////////////////////////////////////////////////////////////////////////


// var staticPath = path.join(__dirname, '/Client/build');
var staticPath = path.join(__dirname, './');
app.use(express.static(staticPath));
app.set('trust proxy', 1)
app.set('port', process.env.PORT || 8080);
// var sess = {
//   secret: 'keyboard cat',
//   credentials: true,
//   resave: false,
//   saveUninitialized: true,
//   cookie: {}
// }
// app.use(session(sess))
app.use(cookieSession({
  name: 'session',
  keys: ['aaa'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
///////////////////////////////////////////////////////////////////////////
// api write here

app.get('/savedatatojson', (req, res) => {
  fs.writeFile('alldata.json', JSON.stringify(allitem), err => {
    if (err) {
      res.send(err);
    }
    console.log('JSON data is saved.')
    res.send('JSON data is saved.');
  })
})

app.post("/post", (req, res) => {
  console.log("Connected to React");
});

app.get('/getdata', (req, res) => {
  res.send(allitem)
})

app.get('/signup', (req, res) => {
  console.log(req.query);
  console.log(req.session);
  res.send(req.query)
  // con.query("call adduser(?,?)",[],(err,result,fields)=>{
  //   res.send(result[0]);
  // })
})

app.get('/login', (req, res) => {
  var result = { result: false };
  allitem[3].forEach(val => {
    if (val.email == req.query.email && val.password == req.query.password) {
      result.result = true;
      result.user = val;
    }
  })
  res.send(result);
})

var getimgcount = 0;
app.get('/getimagelist', (req, res) => {
  con.query("call getitemimage(?)", [req.query.itid], function (err, result, fields) {
    if (err) throw err;
    getimgcount++;
    console.log(getimgcount);
    res.send(result);
  })
})


///////////////////////////////////////////////////////////////////////////

var server = app.listen(app.get('port'), function () {
  console.log('listening');
});