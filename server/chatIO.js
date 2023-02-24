const socketIo = require("socket.io")

module.exports = function (server) {
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
        sql.query('call addchathistory(?,?,?)', [data.sender, data.reciver, data.message], function (err, result, fields) {
            if (err) throw err;
            var userlist = USys.getuserlist('uid');
            var _result = result[0][0];
            var sender = userlist[_result.sender];
            var reciver = userlist[_result.reciver];
            _result.sender_email = sender.info().email;
            _result.reciver_email = reciver.info().email;
            _result.sender_chatname = sender.info().firstname;
            _result.reciver_chatname = reciver.info().firstname;
            sender.addhistory(_result);
            reciver.addhistory(_result);
            console.log(userlist);
            console.log(sender);
            console.log(USys.getuserlist('email'))
        })
    }

    var joinpublicroom = (socket) => {
        joinroom(socket, 'publicroom');
    }

    var joinroom = (socket, roomid) => {
        socket.join(roomid);
        socket.to(roomid).emit(roomid, { action: 'join', user: { uid: socket.request.session.user.uid, chatname: socket.request.session.user.firstname, email: socket.request.session.user.email } })
    }
}