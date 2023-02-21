module.exports = function (app) {
    app.get('/savedatatojson', (req, res) => {
        fs.writeFile('alldata.json', JSON.stringify(allitem), err => {
            if (err) {
                res.send(err);
            }
            console.log('JSON data is saved.')
            res.send('JSON data is saved.');
        })
    })

    app.get('/switchdatasorces', (res, req) => {
        var result = '';
        if (res.query.sorces == 'mysql') {
            usemysql = true;
            result = 'switched to mysql'
            console.log(result)
            loaddata();
        } else if (res.query.sorces == 'json') {
            usemysql = false;
            result = 'switched to json'
            loaddata();
        } else {
            result = 'error'
        }
        req.send(result)
    })
}