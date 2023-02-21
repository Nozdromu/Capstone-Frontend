'use strict';
///////////////////////////////////////////////////////////////////////////
// requires

const path = require('path');
const express = require('express');
const http = require('http')
const mysql = require('mysql');
const cors = require('cors')
const fs = require('fs')
const session = require('express-session')
const sqlconfig = require('./sqlconfig.json');
const Usystem = require('./server/Usystem')

// requires end
////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////
//  global variable

global.sessionsecret = '12345678';


global.allitem = {};

global.USys = new Usystem()

global.usemysql = true;

global.sql = mysql.createConnection(sqlconfig);

global.sessionMiddleware = session({
  secret: sessionsecret,
  saveUninitialized: true,
  resave: false,
  cookie: {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
  }
})

//  global variable end
////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////
// server setting

var app = express();
var server = http.createServer(app);
var staticPath = path.join(__dirname, './');

app.use(cors())
app.use(sessionMiddleware)
app.use(express.static(staticPath));
app.set('port', process.env.PORT || 8080);

//  server setting end
/////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////
//  server function

//  load data from mysql
require('./server/load')()

//plugin Socket.IO 
require('./server/chatIO')(server)

//  server function end
///////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////
// api write here

require('./Apis/user')(app)
require('./Apis/item')(app)
require('./Apis/listing')(app)
require('./Apis/chat')(app)
require('./Apis/other')(app)

// end
////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////
// server start

server.listen(app.get('port'), function () {
  console.log('listening');
});

//
///////////////////////////////////////////////////////////////////////////