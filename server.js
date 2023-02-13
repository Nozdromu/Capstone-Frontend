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
var io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

var room = {};


io.on('connection', (socket) => {
  console.log("connected: " + socket.id);
  console.log(socket);
  if (socket.handshake.query.user_email !== undefined) {
    var user = USys.getuser(socket.handshake.query.user_email);
    if (user !== undefined) {
      socket['user'] = user;
      USys.setsocket(socket.handshake.query.user_email, socket);
      rejoinroom(socket.handshake.query.user_email);
    }
  }
  console.log('///////////////////////////')
  socket.on('passuser', (data) => {
    USys.setsocket(data.type == 1 ? data.email : data.chatname, socket);
    socket.to('lobby').emit('login', { type: 0, chatname: data.chatname, email: data.email })
    socket['user'] = USys.getuser(data.email);
  })
  socket.join('lobby');
  socket.join('publicroom');
  socket.on('chat', (data) => {
    if (data.room !== 'publicroom') {
      // room[data.room].history.push()
      storechathistory({ sender: socket.user.uid, reciver: room[data.room].user1.uid === socket.user.uid ? room[data.room].user2.uid : room[data.room].user1.uid, message: data.message, time: Date.now() }, room[data.room]);
    }

    socket.to(data.room).emit('chat', data);
    console.log(room);
  })
  socket.on("disconnect", (reason) => {
    console.log(socket.id + ' is disconnected!');
  });
  socket.on('reconnect', (socket) => {
    console.log(socket.id + ' is reconnected!');
  })
});

var storechathistory = (data, room) => {
  con.query('call addchathistory(?,?,?)', [data.sender, data.reciver, data.message], function (err, result, fields) {
    if (err) throw err;

    room.history.push(result[0][0]);
    console.log(room);
  })
}

var rejoinroom = (email) => {
  var user = USys.getuser(email);
  var rooms = user.getroom();
  Object.keys(rooms).forEach(val => {
    user.socket().join(rooms[val].id)
  })
}

var joinroom = (main_socket, guest_socket) => {
  var room = main_socket.id + guest_socket.id;
  main_socket.join(room);
  guest_socket.join(room);
  return room;
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
  var user1 = USys.getuser(req.session.user.email);
  var user2 = USys.getuser(req.query.email);
  var id = Date.now();
  room[id] = {
    id: id,
    user1: user1,
    user2: user2,
    history: []
  }
  var r = room[id];
  r[user1.uid] = user1;
  r[user2.uid] = user2;
  user1.joinroom(user2, room[id]);
  user2.joinroom(user1, room[id]);
  var result = { room: id, chatname: req.query.chatname, user: user2 }
  res.send(result);
})

app.get('/create_room_chat', (req, res) => {
  var u;
  allitem[3].forEach(val => {
    if (val.uid == req.query.uid) {
      u = val;
    }
  })
  var user1 = USys.getuser(req.session.user.email);
  var user2 = USys.getuser(u.email);
  user1.join(user1.id + user2.id);
  user2.join(user1.id + user2.id);
  var result = { room: user1.id + user2.id, user: u, chatname: u.firstname }
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