

// class User {
//     #Uid = 0;
//     #Username = '';
//     #Chatname = '';
//     #Firstname = '';
//     #Lastname = '';
//     #Password = '';
//     #Email = '';
//     #Phone = '';
//     #Pic = '';
//     #Socket = {};
//     #Islogin = false;
//     constructor(data) {
//         this.#Uid = data.uid;
//         this.#Username = data.username;
//         this.#Chatname = data.firstname;
//         this.#Firstname = data.firstname;
//         this.#Lastname = data.lastname;
//         this.#Password = data.password
//         this.#Email = data.email;
//         this.#Phone = data.phone;
//         this.#Pic = data.pic;
//     }
//     get uid() {
//         return this.#Uid;
//     }
//     get username() {
//         return this.#Username;
//     }
//     get chatname() {
//         return this.#Chatname;
//     }
//     get firstname() {
//         return this.#Firstname;
//     }
//     get lastname() {
//         return this.#Lastname;
//     }
//     get email() {
//         return this.#Email;
//     }
//     get phone() {
//         return this.#Phone;
//     }
//     get pic() {
//         return this.#Pic;
//     }
//     get socket() {
//         return this.#Socket;
//     }
//     get islogin() {
//         return this.#Islogin;
//     }



//     set socket(socket) {
//         this.#Socket = socket;
//     }

//     getsocket = () => {
//         return this.#Socket;
//     }

//     setsocket = (_socket) => {
//         this.#Socket = _socket;
//     }

//     checkpassword = (psd) => {
//         return this.#Password == psd;
//     }

//     login = (psd) => {
//         this.Islogin = this.checkpassword(psd);
//         return this.Islogin;
//     }
//     logout = () => {
//         this.Islogin = false;
//         return true;
//     }

// }



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