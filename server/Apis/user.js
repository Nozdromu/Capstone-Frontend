module.exports = function (app) {  //receiving "app" instance

    //done part
    app.get('/user/login', (req, res) => {
        var user = USys.userlogin(req.query.email, req.query.password);
        if (user.result) {
            var _user = user.userinfo;
            req.session.user = _user;
        }
        res.send(user);
    })

    app.get('/user/logout', (req, res) => {
        req.session.destroy();
        res.send({ result: true });
    })

    // need work part
    app.get('/user/register', (req, res) => {
        res.send({ result: true })
    })

    app.get('/user/edit', (req, res) => {
        res.send({ result: true })
    })

    app.get('/user/read', (req, res) => {
        res.send({ result: true })
    })
}


