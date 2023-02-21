module.exports = function (app) {
    app.get('/listing/create', (req, res, next) => {
        var result = { result: true }
        res.send(result)
    })
    app.get('/listing/edit', (req, res, next) => {
        var result = { result: true }
        res.send(result)
    })
    app.get('/listing/delete', (req, res, next) => {
        var result = { result: true }
        res.send(result)
    })
    app.get('/listing/read', (req, res, next) => {
        var result = { result: true }
        res.send(result)
    })
}