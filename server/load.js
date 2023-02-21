module.exports = (function () {
    if (usemysql) {
        sql.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
        });
        sql.query("call Alldata", function (err, result, fields) {
            if (err) throw err;
            allitem = result;
            allitem[0].forEach(element => {
                element.list = result[1].filter(e => e.itid == element.itid);
            });
            USys.load(allitem[3]);
            var userlist = USys.getuserlist('uid');
            allitem[4].forEach(val => {
                var sender = userlist[val.sender];
                var reciver = userlist[val.reciver];
                val.sender_email = sender.info().email;
                val.reciver_email = reciver.info().email;
                val.sender_chatname = sender.info().firstname;
                val.reciver_chatname = reciver.info().firstname;
                sender.addhistory(val);
                reciver.addhistory(val);
            })
            console.log(userlist);
        })
    } else {
        allitem = require('./alldata.json');
        USys.load(USys.getuserlist('email'));
    }
})