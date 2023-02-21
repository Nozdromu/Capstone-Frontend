module.exports = function (app) {

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

    app.get('/getchatuser', (req, res) => {
        console.log('in')
        res.send({ Users: USys.getallchatname() });
    })

}