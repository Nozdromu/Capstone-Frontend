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
var sessionMiddleware = session({
  secret: sessionsecret,
  saveUninitialized: true,
  resave: false,
  cookie: {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
  }
})
app.use(sessionMiddleware)


var USys = new Usystem()


////////////////////////////////////////////////////////////////////////////
// mysql connection script
var allitem;
var con;

var usemysql = true;
con = mysql.createConnection(sqlconfig);
var chathistory = {};
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
      var userlist = USys.getuserlist('uid');
      allitem[4].forEach(val => {
        var sender = userlist[val.sender];
        var reciver = userlist[val.reciver];
        val.sender_email = sender.email;
        val.reciver_email = reciver.email;
        val.sender_chatname = sender.firstname;
        val.reciver_chatname = reciver.firstname;
        sender.addhistory(val);
        reciver.addhistory(val);
      })
      console.log(userlist);
    })
  } else {
    allitem = require('./alldata.json');
    USys.load(USys.getuserlist('email'));
  }
}

loaddata();
////////////////////////////////////////////////////////////////////////////
var io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
})
io.engine.use(sessionMiddleware);

io.on('connection', (socket) => {
  console.log("connected: " + socket.id);
  console.log(socket);
  console.log(socket.request.session);
  if (socket.request.session.user !== undefined) {
    USys.setsocket(socket.request.session.user.email, socket);
    joinpublicroom(socket);

    socket.on('publicroom', (data) => {
      console.log(data);
      socket.to('publicroom').emit(data);
    })
    socket.on('chat', (data) => {
      console.log(data);
      if (data.roomid == 'publicroom') {
        socket.to(data.roomid).emit('chat', { chatname: socket.request.session.user.firstname, email: socket.request.session.user.email, message: data.message, roomid: data.roomid });
      }
      else {
        var sender = USys.getuser(socket.request.session.user.email);
        var reciver = USys.getuser(data.roomid);
        if (reciver.socket() != undefined) {
          socket.to(reciver.socket().id).emit('chat', { chatname: socket.request.session.user.firstname, email: socket.request.session.user.email, message: data.message, roomid: socket.request.session.user.email });
          console.log(data);
        }
        storechathistory({ sender: sender.uid, reciver: reciver.uid, message: data.message })
      }

    })
  } else {
    socket.emit('unauthorized', 'unauthorized');
  }

})



var storechathistory = (data) => {
  con.query('call addchathistory(?,?,?)', [data.sender, data.reciver, data.message], function (err, result, fields) {
    if (err) throw err;
    var userlist = USys.getuserlist('uid');
    var _result = result[0][0];
    var sender = userlist[_result.sender];
    var reciver = userlist[_result.reciver];
    _result.sender_email = sender.email;
    _result.reciver_email = reciver.email;
    _result.sender_chatname = sender.firstname;
    _result.reciver_chatname = reciver.firstname;
    sender.addhistory(_result);
    reciver.addhistory(_result);

  })
}

// var rejoinroom = (email) => {
//   var user = USys.getuser(email);
//   var rooms = user.getroom();
//   Object.keys(rooms).forEach(val => {
//     joinroom(user.socket(), val);
//   })
// }
var joinpublicroom = (socket) => {
  joinroom(socket, 'publicroom');
}

var joinroom = (socket, roomid) => {
  socket.join(roomid);
  socket.to(roomid).emit(roomid, { action: 'join', user: { uid: socket.request.session.user.uid, chatname: socket.request.session.user.firstname, email: socket.request.session.user.email } })
}





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
  var user = USys.getuser(req.query.user.email);
  var result = { status: 0, reciver_id: user.uid, roomid: '' }
  if (user.checklogin()) {
    result.status = 1;
    result.roomid = user.socket().id;
    result.chatname = user.firstname;
    result.email = user.email;
  }
  console.log(result);
  res.send(result);
})

app.get('/create_room_chat', (req, res) => {
  console.log(req.query);
  var user = USys.getuserlist('uid')[req.query.uid];
  var result = { status: 0, reciver_id: user.uid, roomid: '' }

  result.status = 1;
  result.roomid = user.socket().id;
  result.chatname = user.firstname;
  result.email = user.email;

  console.log(result);
  res.send(result);
})

app.get('/newchat', (req, res) => {
  var user1 = USys.getuser(req.session.user.email);
  var user2 = USys.getuser(u.email);
})

///////////////////////////////////////////////////////////////////////////



// const socket = new Server(io,{cors: {
//   // origin: ['*'],
//   path:'/chat/'
// }});


server.listen(app.get('port'), function () {
  console.log('listening');
});