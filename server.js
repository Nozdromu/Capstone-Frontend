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

const Usystem = require('./Usystem')



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


var USys = new Usystem()
////////////////////////////////////////////////////////////////////////////
var io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
})




io.on('connection', (socket) => {
  console.log("connected: " + socket.id);
  //console.log(socket);
  if (socket.handshake.user != undefined)
    USys.setsocket(socket.handshake.user, socket);
  console.log('///////////////////////////')
  // socket.on('createroom',())
  socket.on('passuser', (data) => {
    USys.setsocket(data.type == 1 ? data.email : data.chatname, socket);
    console.log(USys.getallchatname());
    socket.to('lobby').emit('login', { type: 0, chatname: data.chatname, email: data.email })
    socket['user'] = data.chatname;
  })
  socket.join('lobby');
  socket.join('publicroom');
  socket.on('chat', (data) => {
    console.log(data);
    socket.to(data.room).emit('chat', data);
  })
  socket.on("disconnect", (reason) => {
    //console.log(socket.id + ' is disconnected!');
  });
  socket.on('reconnect', (socket) => {

  })
});



var joinroom = (main_socket, guest_socket) => {
  var room = main_socket.id + guest_socket.id;
  main_socket.join(room);
  guest_socket.join(room);
  return room;
}



////////////////////////////////////////////////////////////////////////////
// mysql connection script
var allitem;
var con;

var usemysql = false;
con = mysql.createConnection(sqlconfig);

var loaddata = () => {
  if (usemysql) {
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
      USys.load(allitem[3]);
    })
  } else {
    allitem = require('./alldata.json');
    USys.load(allitem[3]);
  }
}

loaddata();





////////////////////////////////////////////////////////////////////////////


//var staticPath = path.join(__dirname, '/Client/build');
var staticPath = path.join(__dirname, './');
app.use(express.static(staticPath));
app.set('port', process.env.PORT || 8080);
app.use((req, res, next) => {
  if (req.session.user == undefined) {

  }
  next();
})

/////////////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////////////
// api write here

var checkguest = () => {

}

app.get('/savedatatojson', (req, res) => {
  fs.writeFile('alldata.json', JSON.stringify(allitem), err => {
    if (err) {
      res.send(err);
    }
    console.log('JSON data is saved.')
    res.send('JSON data is saved.');
  })
})

app.get('/switchdatasorces', (res, req) => {
  var result = '';
  if (res.query.sorces == 'mysql') {
    usemysql = true;
    result = 'switched to mysql'
    console.log(result)
    loaddata();
  } else if (res.query.sorces == 'json') {
    usemysql = false;
    result = 'switched to json'
    loaddata();
  } else {
    result = 'error'
  }
  req.send(result)
})


app.get('/getdata', (req, res) => {
  var result = { data: allitem, islogin: false, guestuser: {}, user: {} };
  if (req.session.user != undefined) {
    result.islogin = true;
    result.user = req.session.user
  }
  res.send(result)
})

app.get('/getchatuser', (req, res) => {
  console.log('in')
  res.send({ Users: USys.getallchatname() });
})

app.get('/login', (req, res) => {
  //var result = { result: false, user: {} };
  var user = USys.userlogin(req.query.email, req.query.password);
  if (user.result) {
    var _user = user.userinfo;
    req.session.user = _user;
  }
  res.send(user);
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

app.get('/startchat', (req, res) => {
  result = { result: false, room: '' };

})

app.get('/testsigup', (req, res) => {
  var result = {
    result: true, user: {
      user: req.query.signupinfo
    }
  }
  console.log(req.query);
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

app.get('/create_room', (req, res) => {
  console.log(req.query);
  var user1 = USys.getsocket(req.session.user.email);
  var user2 = USys.getsocket(req.query.email);
  user1.join(user1.id + user2.id);
  user2.join(user1.id + user2.id);
  var result = { room: user1.id + user2.id, chatname: req.query.chatname }
  res.send(result);
})

app.get('/create_room_chat', (req, res) => {
  var u;
  allitem[3].forEach(val => {
    if (val.uid == req.query.uid) {
      u = val;
    }
  })
  var user1 = USys.getsocket(req.session.user.email);
  var user2 = USys.getsocket(u.email);
  user1.join(user1.id + user2.id);
  user2.join(user1.id + user2.id);
  var result = { room: user1.id + user2.id, chatname: u.firstname }
  res.send(result);
})

///////////////////////////////////////////////////////////////////////////



// const socket = new Server(io,{cors: {
//   // origin: ['*'],
//   path:'/chat/'
// }});


server.listen(app.get('port'), function () {
  console.log('listening');
});