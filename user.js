module.exports = user;
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

    return {
        uid: uid,
        chatname: chatname,
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        pic: pic,
        socket: getsocket,
        setsocket: setsocket,
        checkpassword: checkpassword
    }
}