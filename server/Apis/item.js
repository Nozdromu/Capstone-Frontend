module.exports = function (app) {


    app.get('/item/create', (req, res, next) => {
        var response = { response: false }
        sql.query('call item_create(?,?,?,?,?,?,?,?)', [
            req.query.itemname,
            req.query.brand,
            req.query.mnumber,
            req.query.description,
            req.query.price,
            req.query.qty,
            req.query.gsid,
            req.session.user.uid
        ], (err, result, fields) => {
            if (err) {
                throw err;
            } else {
                result[0][0].list = allitem[1].filter(e => e.itid === result[0][0].itid);
                allitem[0].push(result[0][0]);
            }
            res.send(response)
        })
    })
    app.get('/item/edit', (req, res, next) => {
        var response = { response: false }
        sql.query('call item_update(?,?,?,?,?,?,?)', [
            req.query.itid,
            req.query.itemname,
            req.query.brand,
            req.query.mnumber,
            req.query.description,
            req.query.price,
            req.query.qty
        ], (err, result, fields) => {
            if (err) {
                throw err;
            } else {
                allitem[0].forEach((element, index) => {
                    if (element.itid === result[0][0].itid) {
                        allitem[0][index] = result[0][0];
                        allitem[0][index].list = allitem[1].filter(e => e.itid === element.itid);
                    }

                });
            }
            res.send(response)
        })

    })
    app.get('/item/delete', (req, res, next) => {
        var response = { response: false }
        sql.query('call item_delete(?)', [req.query.itid], (err, result, fields) => {
            if (err) {
                throw err
            } else {
                allitem[0].forEach(element => {
                    if (element.itid === result[0][0].itid) {
                        element.isdelete = 1;
                    }
                })
            }
            res.send(response)
        })

    })
    app.get('/item/read', (req, res, next) => {
        var response = { response: true }
        res.send(response)
    })

    app.get('/item/listing', (req, res, next) => {
        var response = { response: true }
        var gsid = parseInt(req.query.gsid);
        response.items = allitem[0].filter((element) => { return element.gsid === gsid && element.isdelete === 0 })
        console.log(response.items)
        res.send(response)
    })

    app.get('/getdata', (req, res, next) => {
        var result = { data: { items: allitem[0].filter((val) => { return val.display === 0 }), listings: allitem[2].filter((val) => { return val.isdelete === 0 }) }, islogin: false, guestuser: {}, user: {} };
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