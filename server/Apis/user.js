const { response } = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require('fs');
const axios = require('axios')

module.exports = function (app) {  //receiving "app" instance

    //done part
    app.get('/user/login', (req, res) => {
        var response = { result: false }
        var user = USys.userlogin(req.query.email, req.query.password);
        if (user.result) {
            var _user = user.userinfo;
            response.result = true
            req.session.user = _user.info();
            response.user = _user.info()
        }
        res.send(response);
    })

    app.get('/user/logout', (req, res) => {
        req.session.destroy();
        res.send({ result: true });
    })

    // need work part
    app.get('/user/register', (req, res) => {
        var response = { result: false }
        sql.query(
            'call user_create(?,?,?)',
            [req.query.email, req.query.username, req.query.password],
            (err, result, fields) => {
                if (err) {
                    response.message = err
                    throw err
                } else {
                    response.result = true;
                    response.userinfo = result[0]
                }
                res.send(response)
            }
        )

    })

    app.put('/user/edit', upload.single('image_url'), (req, res) => {
        var user = req.body;
        var response = { result: false }
        if (req.session.user) {
            if (req.session.user.uid.toString() === user.uid) {
                if (user.image_url) {
                    axios.get(user.image_url, {
                        responseType: "text",
                        responseEncoding: "base64",
                    })
                        .then((resp) => {
                            console.log(resp.data);
                            fs.writeFileSync('./uploads/user_' + user.uid + '.jpg', resp.data, { encoding: "base64" });
                        })
                    user.profilepicture = './uploads/user_' + user.uid + '.jpg';
                }
                sql.query(
                    'call user_update(?,?,?,?,?,?,?,?,?)',
                    [user.uid, user.firstname, user.lastname, user.email, user.phone, user.username, user.profilepicture, user.zip, user.state],
                    (err, result, fields) => {
                        if (err) {
                            response.message = err
                            throw err;
                        } else {
                            var user = USys.getuserbyuid(req.session.user.uid)
                            user.updata(result[0][0])
                            response.result = true;
                            console.log(user.info());
                            req.session.user = USys.getuserbyuid(req.session.user.uid).info()
                            response.userinfo = USys.getuserbyuid(req.session.user.uid).info()
                        }
                        res.send(response)
                    }
                )
            } else {
                response.message = 'some thing wrong'
                res.send(response)
            }
        } else {
            response.message = 'user not login'
            res.send(response)
        }
    })

    async function download(url, uid) {
        const response = await fetch(url);
        const buffer = await response.buffer();
        fs.writeFile('./uploads/user_' + uid + '.jpg', buffer, () =>
            console.log('finished downloading!'));
    }

    app.get('/user/delete', (req, res) => {
        var user = req.query.userinfo;
        var response = { result: false }
        if (req.session.user.uid === user.uid) {
            sql.query(
                'call user_delete(?)',
                [user.uid],
                (err, result, fields) => {
                    if (err) {
                        response.message = err
                        throw err;
                    } else {
                        response.result = true;
                        response.userinfo = result[0]
                    }
                }
            )
        }
        res.send(response)
    })

    app.get('/user/read', (req, res) => {
        var response = { result: false }
        if (req.session.user !== undefined) {
            response.result = true;
            response.user = USys.getuserbyuid(req.session.user.uid).info();
        }
        res.send(response)
    })
}


