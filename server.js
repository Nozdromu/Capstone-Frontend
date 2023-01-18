'use strict';

///////////////////////////////////////////////////////////////////////////
// requires

var path = require('path');
var express = require('express');
var mysql = require('mysql');
var sqlconfig=require('./sqlconfig.json');
var session = require('express-session')



////////////////////////////////////////////////////////////////////////////

var app = express();


////////////////////////////////////////////////////////////////////////////
// mysql connection script
var con = mysql.createConnection(sqlconfig);
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
var allitem;
  con.query("call Alldata",function(err,result,fields){
    if(err)throw err;
    
    allitem=result;
    allitem[0].forEach(element => {
      element.list=result[1].filter(e=>e.itid==element.itid);
    });
  })
////////////////////////////////////////////////////////////////////////////


// var staticPath = path.join(__dirname, '/Client/build');
var staticPath = path.join(__dirname, './');
app.use(express.static(staticPath));
  
app.set('port', process.env.PORT || 8080);


///////////////////////////////////////////////////////////////////////////
// api write here

app.post("/post", (req, res) => {
  console.log("Connected to React");
});
  
app.get('/getdata',(req,res)=>{
  res.send(allitem)
})

app.get('/signup',(req,res)=>{
  console.log(req);
  // con.query("call adduser(?,?)",[],(err,result,fields)=>{
  //   res.send(result[0]);
  // })
})

var getimgcount=0;
app.get('/getimagelist',(req,res)=>{
  con.query("call getitemimage(?)",[req.query.itid],function(err,result,fields){
    if(err)throw err;
    getimgcount++;
    console.log(getimgcount);
    res.send(result);
  })
})


///////////////////////////////////////////////////////////////////////////

var server = app.listen(app.get('port'), function () {
    console.log('listening');
});