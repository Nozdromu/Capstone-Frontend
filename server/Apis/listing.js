module.exports = function (app) {
    app.get('/listing/create', (req, res, next) => {
        console.log(req.query);
        var listing = req.query;
        var response = { result: false }
        sql.query('call New_listing_create(?,?,?,?,?,?,?,?,?)',
            [
                req.session.user.uid,
                listing.title,
                listing.description,
                listing.starttime,
                listing.endtime,
                listing.location,
                listing.zip_code,
                listing.lat,
                listing.lng,
            ], (err, result, fields) => {
                if (err) {
                    throw err
                } else {
                    response.result = true;
                    response.listing = result[0]

                    allitem[2].push(result[0][0]);
                }
                res.send(response)
            })
    })
    app.get('/listing/edit', (req, res, next) => {
        console.log(req.query);
        var listing = req.query;
        var response = { result: false }
        sql.query('call New_listing_update(?,?,?,?,?,?,?,?,?)',
            [
                listing.gsid,
                listing.title,
                listing.description,
                listing.starttime,
                listing.endtime,
                listing.location,
                listing.zip_code,
                listing.lat,
                listing.lng,
            ], (err, result, fields) => {
                if (err) {
                    throw err
                } else {
                    response.result = true;
                    response.listing = result[0]
                    var i = 0;
                    allitem[2].forEach(element => {
                        if (element.gsid == listing.gsid) {
                            allitem[2][i] = result[0][0]
                        }
                        i++;
                    });
                }
                res.send(response)
            })

    })
    app.get('/listing/delete', (req, res, next) => {
        var response = { result: false }
        sql.query('call New_listing_delete(?)', [req.query.gsid], (err, result, fields) => {
            if (err) {
                throw err;
            } else {
                response.result = true
                var i = 0;
                allitem[2].forEach(element => {
                    if (element.gsid == req.query.gsid) {
                        allitem[2][i].isdelete = 1;
                    }
                    i++;
                });
            }
            res.send(response)
        })

    })
    app.get('/listing/read', (req, res, next) => {
        var result = { result: true }
        res.send(result)
    })
    app.get('/listing/owner', (req, res, next) => {
        var result = { result: true }
        if (req.session.user !== undefined) {
            var userid = req.session.user.uid;
            result.list = [];
            allitem[2].forEach(val => {
                if (val.uid === userid && val.isdelete === 0) {
                    result.list.push(val)
                }
            })
            console.log(result);
        }

        res.send(result)
    })
}