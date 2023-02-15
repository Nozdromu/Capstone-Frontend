const user = require('./user')
module.exports = Usystem;


function Usystem() {
    var usertabel = {};
    var uobject = {};
    var userbykey = {};


    var load = (data) => {
        data.forEach(val => {
            var _user = new user(val)
            usertabel[val.email] = _user;
            userbykey[val.uid] = _user;
        })
    }

    var userlogin = (_email, _password) => {
        var result = {
            result: false,
            userinfo: {}
        }
        if (usertabel[_email] != undefined && usertabel[_email].login(_password)) {
            result.result = true;
            var newuser = usertabel[_email]
            uobject[newuser.email] = newuser;
            result.userinfo = newuser;
        }
        return result;
    }

    var logout = (login_id) => {
        delete uobject[login_id];
        return true;
    }

    var getalluser = () => {
        return uobject;
    }
    var getalluserinfo = () => {
        var x = (Object.values(uobject)).map((val) => {
            return val;
        })
        return x;
    }

    var getallchatname = () => {
        var x = (Object.values(uobject)).map((val) => {
            return { chatname: val.chatname, email: val.email };
        })
        return x;
    }

    var getuser = (key) => {
        return uobject[key];
    }

    var getuserbyuid = (uid) => {
        return userbykey[uid];
    }

    var setsocket = (key, socket) => {
        getuser(key).setsocket(socket);
    }

    var socket_switch = (user_key, guest_key) => {
        getuser(user_key).setsocket(getuser(guest_key).socket);
    }

    var getsocket = (key) => {
        var user = getuser(key);
        return user.socket();
    }

    return {
        load: load,
        userlogin: userlogin,
        logout: logout,
        getalluser: getalluser,
        getalluserinfo: getalluserinfo,
        getallchatname: getallchatname,
        setsocket: setsocket,
        getuser: getuser,
        socket_switch, socket_switch,
        getsocket: getsocket,
        getuserbyuid: getuserbyuid
    }
}


