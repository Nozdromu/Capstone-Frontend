

function user(data) {
    var uid = data.uid;
    var username = data.username;
    var chatname = data.firstname;
    var firstname = data.firstname;
    var lastname = data.lastname;
    var password = data.password
    var email = data.email;
    var phone = data.phone;
    var profilepicture = data.profilepicture;
    var zip=data.zip;
    var state=data.state;
    var chathistory = {};
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
    var getroom = () => {
        return Room;
    }

    return {
        uid: uid,
        chathistory: chathistory,
        info: () => {
            return {
                uid: uid,
                username: username,
                chatname: firstname,
                firstname: firstname,
                lastname: lastname,
                password: password,
                email: email,
                phone: phone,
                profilepicture: profilepicture,
                chathistory: chathistory,
                islogin: islogin,
                Room: Room,
                zip:zip,
                state:state,
            }
        },
        updata: (val) => {
            username = val.username;
            phone = val.phone;
            firstname = val.firstname;
            lastname = val.lastname;
            email = val.email
            zip=val.zip;
            state=val.state;
            return this
        },
        checklogin: _islogin,
        socket: getsocket,
        setsocket: setsocket,
        checkpassword: checkpassword,
        login: login,
        logout: logout,
        chatinfo: chatinfo,
        joinroom: joinroom,
        getroom: getroom,
        addhistory: (data) => {
            var _email = data.sender_email;
            var _chatname = data.sender_chatname
            if (_email === email) {
                _email = data.reciver_email;
                _chatname = data.reciver_chatname
            }


            if (chathistory[_email] === undefined)
                chathistory[_email] =
                {
                    email: _email,
                    chatname: _chatname,
                    history: []
                }

            chathistory[_email].history.push(data);
        },
        chath: () => {
            return chathistory;
        }
    }
}
module.exports = user;