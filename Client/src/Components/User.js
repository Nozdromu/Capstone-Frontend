
import { useState } from 'react';
import AllData from './Data';

var User = function () {
    var islogin = false;
    var guest = '';
    var uid = 0;
    var firstname = '';
    var lastname = '';
    var email = '';
    var phone = '';
    var img = '';
    var list = [];

    var login = (val) => {
        uid = parseInt(val.uid);
        firstname = val.firstname;
        lastname = val.lastname;
        email = val.email;
        phone = val.phone;
        img = val.profilepicture;
        islogin=true;
        getlist();

        console.log(list);
    }
    var getlist = () => {
        list = []
        AllData.list().forEach(val => {
            if (val.uid === uid) {
                list.push(val)
            }
        })
    }
    var logout = (val) => {
        islogin=false;
    }
    var getuser = () => {
        return {
            uid: uid,
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone: phone,
            img: img,
            list: list,
            type:1
        }
    }
    var setguest = (data) => {
        guest = data;
    }
    var getguest = () => {
        return guest;
    }

    var getislogin=()=>{
        return islogin;
    }
    return {
        _login: login,
        _logout: logout,
        _getuser: getuser,
        _setguest: setguest,
        _getguest: getguest,
        _islogin: getislogin
    };
}

export default User;