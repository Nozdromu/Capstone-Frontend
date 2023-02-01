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
    var uid = -1;
    var type = 0;
    var chatname = '';
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
        uid = data.uid;
        username = data.username
        chatname = data.firstname
        firstname = data.firstname
        lastname = data.lastname
        email = data.email
        phone = data.phone
        pic = data.pic
      } else {
        chatname = data;
      }

    }

    var setsocket = (_socket) => {
      socket = _socket;
    }


    var getuser = () => {
      return {
        uid: uid,
        type: type,
        chatname: chatname,
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
      getinfo: getuser,
      load: load,
      setsocket: setsocket,
      socket: this.socket
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
      newuser.load(1, usertabel[_email]);
      uobject[newuser.getinfo().email] = newuser;
      result.userinfo = uobject[newuser.getinfo().email].getinfo();
    }
    return result;
  }

  var guestlogin = () => {
    var newuser = new u();
    newuser.load(0, 'guest_' + guestid++);
    uobject[newuser.getinfo().chatname] = newuser;
    return uobject[newuser.getinfo().chatname];
  }

  var logout = (login_id) => {
    delete uobject[login_id];
    return true;
  }

  var getalluser = () => {
    return uobject;
  }
  var getalluserinfo = () => {
    var x = (Object.values(uobject)).map((val) => {
      return val.getinfo();
    })
    return x;
  }

  var getallchatname = () => {
    var x = (Object.values(uobject)).map((val) => {
      return {chatname:val.getinfo().chatname,email:val.getinfo().email};
    })
    return x;
  }

  var getuser = (key) => {
    return uobject[key];
  }

  var getuser_info_by_key = (key) => {
    return getuser(key).getinfo();
  }

  var setsocket = (key, socket) => {
    getuser(key).setsocket(socket);
  }

  var socket_switch = (user_key, guest_key) => {
    getuser(user_key).setsocket(getuser(guest_key).socket);
  }

  var getsocket=(key)=>{
    var user=getuser(key).getinfo();
    return user.socket;
  }

  return {
    load: load,
    userlogin: userlogin,
    guestlogin: guestlogin,
    logout: logout,
    getalluser: getalluser,
    getalluserinfo: getalluserinfo,
    getallchatname: getallchatname,
    getuserinfobykey: getuser_info_by_key,
    setsocket: setsocket,
    socket_switch, socket_switch,
    getsocket:getsocket
  }
}


var _server = () => {

}



io.on('connection', (socket) => {
  console.log("connected: " + socket.id);
  //console.log(socket);
  if (socket.handshake.user != undefined)
    alluser.setsocket(socket.handshake.user, socket);
  console.log('///////////////////////////')
  // socket.on('createroom',())
  socket.on('passuser', (data) => {
    alluser.setsocket(data.type == 1 ? data.email : data.chatname, socket);
    console.log(alluser.getallchatname());
    socket.to('lobby').emit('login', { type: 0, chatname: data.chatname,email:data.email })
    socket['user'] = data.chatname;
    //console.log(socket);
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
    //console.log(socket.id + '_reconnected!');
    //console.log(socket);
    //console.log('////////////////////////////')
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
var _alluser = alluser.getalluser();

app.get('/getdata', (req, res) => {
  var result = { data: allitem, islogin: false, guestuser: {}, user: {} };
  // var x;
  if (req.session.user == undefined) {
    // if (req.session.guestuser == undefined) {
    //   var newguest = alluser.guestlogin()
    //   x = newguest.getinfo();
    //   result.guestuser = x;
    //   req.session.guestuser = x;
    // } else {
    //   result.guestuser = req.session.guestuser
    // }

  } else {
    result.islogin = true;
    result.user = req.session.user;
  }
  res.send(result)
})

app.get('/getchatuser', (req, res) => {
  console.log('in')
  res.send({ alluser: alluser.getallchatname() });
})

app.get('/login', (req, res) => {
  //var result = { result: false, user: {} };
  var user = alluser.userlogin(req.query.email, req.query.password);
  if (user.result) {
    var _user = user.userinfo;
    req.session.user = _user;
    // if (req.session.guestuser != undefined) {
    //   alluser.socket_switch(_user.email, req.session.guestuser.chatname)
    //   alluser.logout(req.session.guestuser.chatname);
    //   delete req.session.guestuser;
    // }
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

app.get('/create_room',(req,res)=>{
  console.log(req.query);
  var user1=alluser.getsocket(req.session.user.email);
  var user2=alluser.getsocket(req.query.email);
  user1.join(user1.id+user2.id);
  user2.join(user1.id+user2.id);
  var result={room:user1.id+user2.id,chatname:req.query.chatname}
  
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