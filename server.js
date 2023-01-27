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
var _user = [];
//var xxx={};
// var y='ww@www.com'
// xxx[y]=1;
// console.log(xxx);
// console.log(xxx[y]);
var _u = function () {
  var guestid = 0;
  var ulist = [];
  var uobject = {};
  var usertabel = {};
  var u = function () {
    var type = 0;
    var username = '';
    var firstname = '';
    var lastname = '';
    var email = '';
    var phone = '';
    var pic = '';
    var socket = {};
    var load = (_type, data) => {
      type = _type;
      if (type == 1) {
        username = data.username
        firstname = data.firstname
        lastname = data.lastname
        email = data.email
        phone = data.phone
        pic = data.pic
      } else {
        username = data;
      }

    }

    var setsocket = (_socket) => {
      socket = _socket;
    }

    var getuser = () => {
      return {
        type: type,
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        pic: pic,
        socket: socket,
      }
    }

    return {
      data:{
        type: this.type,
        username: this.username,
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        phone: this.phone,
        pic: this.pic,
        socket: this.socket,
      },
      getinfo: getuser,
      load: load,
      setsocket: setsocket
    }
  }

  var load = (data) => {
    data.forEach(val => {
      usertabel[val.email] = val;
    })
  }
  var userlogin = (_email, _password) => {
    var result = {
      result: false,
      userinfo: {}
    }
    if (usertabel[_email] != undefined && usertabel[_email].password == _password) {
      result.result = true;
      var newuser = new u();
      newuser.load(1,usertabel[_email]);
      uobject[newuser.getinfo().email] = newuser;
      result.userinfo = uobject[newuser.getinfo().email].getinfo();
    }
    return result;
  }

  var guestlogin = () => {
    var newuser = new u();
    newuser.load(0, 'guest_' + guestid++);
    uobject[newuser.getinfo().username] = newuser;
    return uobject[newuser.getinfo().username];
  }

  var logout = (login_id) => {
    delete uobject[login_id];
    return true;
  }

  var getuser = () => {
    return uobject;
  }

  var setsocket = (key, socket) => {
    uobject[key].setsocket(socket);
  }
  return {
    load: load,
    userlogin: userlogin,
    guestlogin: guestlogin,
    logout: logout,
    getuser: getuser,
    setsocket: setsocket
  }
}



io.on('connection', (socket) => {
  console.log("connected: " + socket.id);
  // socket.on('createroom',())
  socket.on('passuser', (data) => {
    alluser.setsocket(data.username, socket);
    socket.to('lobby').emit('login', { type: 0, username: data.username })
    // if (data.type == 0) {
    //   loginUser.guest[data.username].socketid = socket;
    //   _user.push(loginUser.guest[data.username]);
    //   socket.to('lobby').emit('login', { type: 0, username: data.username })
    // } else if (data.type == 1) {
    //   loginUser.user[data.uid].socketid = socket;
    //   _user.push(loginUser.guest[data.username]);
    //   socket.to('lobby').emit('login', { type: 1, username: data.uid })
    // }
    // console.log(loginUser);
  })
  socket.join('lobby');
  socket.join('room1');
  socket.on('chat', (data) => {
    console.log(data);
    socket.to(data.room).emit('chat', data);
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
    alluser.load(allitem[3]);
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
  if (req.session.user == undefined) {

  }
  next();
})

/////////////////////////////////////////////////////////////////////////

var user = [];

var loginUser = {
  guest: {},
  user: {}
}


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

var alluser = new _u()
var _alluser = alluser.getuser();

app.get('/getdata', (req, res) => {
  var result = { data: allitem, islogin: false, guestuser: {}, user: {} };
  var x;
  if (req.session.user == undefined) {
    var newguest = alluser.guestlogin()
    x = newguest.getinfo();
    result.guestuser = x;
    req.session.guestuser = x;
  } else {
    result.islogin = true;
    //result.user = req.session.user;
  }
  res.send(result)
})

app.get('/login', (req, res) => {
  //var result = { result: false, user: {} };
  var user = alluser.userlogin(req.query.email, req.query.password);
  if (user.result) {
    var _user = user.userinfo;
    req.session.user = _user;
    if (req.session.guest != undefined) {
      alluser.logout(req.session.guest.username);
    }
  }
  // allitem[3].forEach(user => {
  //   if (user.email == req.query.email && user.password == req.query.password) {
  //     req.session.user = user;
  //     result.result = true;
  //     result.user = {
  //       uid: user.uid,
  //       firstname: user.firstname,
  //       lastname: user.lastname,
  //       email: user.email,
  //       phone: user.phone,
  //       img: user.profilepicture
  //     }
  //     loginUser.user[result.user.uid] = result.user;
  //     console.log(loginUser);
  //   }
  // })
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