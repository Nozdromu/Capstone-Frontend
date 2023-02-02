import Core from './Core';

var User = (function () {
    var islogin = false;
    var guest = '';
    var chatname='';
    var uid = 0;
    var firstname = '';
    var lastname = '';
    var email = '';
    var phone = '';
    var img = '';
    var list = [];

    var login = (val) => {
        uid = val.uid;
        firstname = val.firstname;
        lastname = val.lastname;
        email = val.email;
        phone = val.phone;
        img = val.profilepicture;
        islogin = true;
        getlist();
        Core.opensocket();
    }
    var getlist = () => {
        list = []
        Core.list().forEach(val => {
            if (val.uid === uid) {
                list.push(val)
            }
        })
    }
    var logout = (val) => {
        islogin = false;
    }
    var getuser = () => {
        return {
            uid: uid,
            chatname: firstname,
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone: phone,
            img: img,
            list: list,
            type: islogin ? 1 : 0
        }
    }
    var setguest = (data) => {
        uid = -1;
        firstname = data.chatname;
        email = data.chatname;
        chatname = data.chatname;
        guest = data;
    }
    var getguest = () => {
        return guest;
    }

    var getislogin = () => {
        return islogin;
    }
    var getchetname = () => {
        var result = { key: '', chatname: '' }
        if (islogin) {
            result.key = email;
            chatname = chatname;
        } else {
            if (chatname == '') {

            } else {
                result.key = chatname;
                result.chatname = chatname;
            }

        }
    }
    return {
        _login: login,
        _logout: logout,
        _getuser: uid == -1 ? getguest : getuser,
        _setguest: setguest,
        _islogin: getislogin,
        _getchetname:getchetname
    };
})()

export default User;