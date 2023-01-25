'use strict';

///////////////////////////////////////////////////////////////////////////
// requires

const path = require('path');
const express = require('express');
const socketIo = require("socket.io")
const http = require('http')
const mysql = require('mysql');
const cors = require('cors')
const fs = require('fs')
const session = require('express-session')

const sqlconfig = require('./sqlconfig.json');


////////////////////////////////////////////////////////////////////////////

var sessionsecret = '12345678';



////////////////////////////////////////////////////////////////////////////

var app = express();
var server = http.createServer(app);
app.use(cors())
app.use(session({
  secret: sessionsecret,
  saveUninitialized: true,
  resave: false,
  cookie: {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
  }
}))



////////////////////////////////////////////////////////////////////////////
var io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
})
io.on('connection', (socket) => {
  console.log("connected: " + socket.id);
  console.log(socket);
  // socket.on('createroom',())
  socket.on('passuser',(data)=>{
    if(data.type==0){
      loginUser.guest[data.username].socketid=socket;
    }else if(data.type==1){
      loginUser.user[data.uid].socketid=socket;
    }
    console.log(loginUser);
  })
  socket.join('room1');
  socket.on('chat', (data) => {
    console.log(data);
    socket.to('room1').emit('chat', data);
  })
});

io.sockets.emit("hi", 'hello');


////////////////////////////////////////////////////////////////////////////
// mysql connection script
var allitem;
var con;

var usemysql = true;

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
} else {
  allitem = require('./alldata.json');
}




////////////////////////////////////////////////////////////////////////////


//var staticPath = path.join(__dirname, '/Client/build');
var staticPath = path.join(__dirname, './');
app.use(express.static(staticPath));
app.set('port', process.env.PORT || 8080);
app.use((req, res, next) => {
  if(req.session.user==undefined){

  }
  next();
})

/////////////////////////////////////////////////////////////////////////

var user = [];

var loginUser={
  guest:{},
  user:{}
}


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


app.get('/getdata', (req, res) => {
  var result = { data: allitem, islogin: false, guestuser: {}, user: {} };
  var x;
  if (req.session.user == undefined) {
    x = { id: user.length, username: 'guest' + user.length, type: 0, socketid: '' };
    result.guestuser = x;
    user.push(x);
    loginUser.guest[x.username]=x;
  } else {
    result.islogin = true;
    result.user = req.session.user;
  }
  res.send(result)
})

app.get('/login', (req, res) => {
  var result = { result: false, user: {} };
  allitem[3].forEach(user => {
    if (user.email == req.query.email && user.password == req.query.password) {
      req.session.user = user;
      result.result = true;
      result.user = {
        uid: user.uid,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        img: user.profilepicture
      }
      loginUser.user[result.user.uid]=result.user;
      console.log(loginUser);
    }
  })
  res.send(result);
})

app.get('/socketid', (req, res) => {
  req.session.user.socketid = req.query.socketid;
  res.send({ result: true });
})


app.get('/signup', (req, res) => {
  console.log(req.query);
  console.log(req.session);
  res.send(req.query)
  // con.query("call adduser(?,?)",[],(err,result,fields)=>{
  //   res.send(result[0]);
  // })
})

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.send({ result: true });
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



// const socket = new Server(io,{cors: {
//   // origin: ['*'],
//   path:'/chat/'
// }});


server.listen(app.get('port'), function () {
  console.log('listening');
});