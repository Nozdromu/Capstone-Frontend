'use strict';

///////////////////////////////////////////////////////////////////////////
// requires

var path = require('path');
var express = require('express');
var mysql = require('mysql');



////////////////////////////////////////////////////////////////////////////

var app = express();

////////////////////////////////////////////////////////////////////////////
// mysql connection script
// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root" ,
//     password: "12345678"
//   });
//   con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//   });
////////////////////////////////////////////////////////////////////////////


var staticPath = path.join(__dirname, '/Client/build');
app.use(express.static(staticPath));
  
app.set('port', process.env.PORT || 8080);


///////////////////////////////////////////////////////////////////////////
// api write here

app.post("/post", (req, res) => {
  console.log("Connected to React");
});
  

///////////////////////////////////////////////////////////////////////////

var server = app.listen(app.get('port'), function () {
    console.log('listening');
});