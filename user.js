

function user(data) {
    var uid = data.uid;
    var username = data.username;
    var chatname = data.firstname;
    var firstname = data.firstname;
    var lastname = data.lastname;
    var password = data.password
    var email = data.email;
    var phone = data.phone;
    var pic = data.pic;
    var islogin = false;
    var Room = {};
    var socket = {};

    var getsocket = () => {
        return socket;
    }

    var setsocket = (_socket) => {
        socket = _socket;
    }

    var checkpassword = (psd) => {
        return password == psd;
    }

    var _islogin = () => {
        return islogin;
    }
    var login = (psd) => {
        return islogin = password === psd;
    }
    var logout = () => {
        islogin = false;
        socket = null;
        return !islogin
    }
    var chatinfo = () => {
        return {
            uid: uid,
            chatname: chatname,
            email: email
        }
    }
    var joinroom = (user, room) => {
        Room[user.email] = room;
        socket.join(room.id);
    }
    var getroom=()=>{
        return Room;
    }

    return {
        uid: uid,
        chatname: chatname,
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        pic: pic,
        checklogin: _islogin,
        socket: getsocket,
        setsocket: setsocket,
        checkpassword: checkpassword,
        login: login,
        logout: logout,
        chatinfo: chatinfo,
        joinroom:joinroom,
        getroom:getroom
    }
}
module.exports = user;