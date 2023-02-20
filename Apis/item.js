module.exports = function (app) {

    
    app.get('/item/create', (req, res, next) => {
        var result = { result: true }
        res.send(result)
    })
    app.get('/item/edit', (req, res, next) => {
        var result = { result: true }
        res.send(result)
    })
    app.get('/item/delete', (req, res, next) => {
        var result = { result: true }
        res.send(result)
    })
    app.get('/item/read', (req, res, next) => {
        var result = { result: true }
        res.send(result)
    })


    app.get('/getdata', (req, res, next) => {
        var result = { data: allitem, islogin: false, guestuser: {}, user: {} };
        if (req.session.user != undefined) {
            result.islogin = true;
            result.user = req.session.user
        }
        res.send(result)
    })


    app.get('/getimagelist', (req, res, next) => {
        sql.query("call getitemimage(?)", [req.query.itid], function (err, result, fields) {
            res.send(result);
        })
    })
}