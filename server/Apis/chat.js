module.exports = function (app) {

    app.get('/create_room', (req, res) => {
        console.log(req.query);
        var user = USys.getuserlist('uid')[req.query.uid];
        var result = { status: 0, reciver_id: user.uid, roomid: '' }

        result.status = 1;
        result.roomid = user.socket().id;
        result.chatname = user.info().firstname;
        result.email = user.info().email;

        console.log(result);
        res.send(result);
    })

    app.get('/getchatuser', (req, res) => {
        console.log('in')
        res.send({ Users: USys.getallchatname() });
    })

}