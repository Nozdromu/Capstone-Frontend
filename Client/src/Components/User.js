
import { useState } from 'react';
import AllData from './Data';

var User = (function () {
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
        // setsession();

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
    // var loadsession = () => {
    //     if (sessionStorage.islogin) {
    //         uid = parseInt(sessionStorage.getItem('uid'));
    //         firstname = sessionStorage.getItem('firstname');
    //         lastname = sessionStorage.getItem('lastname');
    //         email = sessionStorage.getItem('email');
    //         phone = sessionStorage.getItem('phone');
    //         img = sessionStorage.getItem('img')
    //         getlist();
    //     }

    // }
    // var setsession = () => {
    //     sessionStorage.setItem('islogin', true)
    //     sessionStorage.setItem('uid', uid);
    //     sessionStorage.setItem('firstname', firstname);
    //     sessionStorage.setItem('lastname', lastname);
    //     sessionStorage.setItem('email', email);
    //     sessionStorage.setItem('phone', phone);
    //     sessionStorage.setItem('img', img);
    // }
    var logout = (val) => {
        sessionStorage.setItem('islogin', false)
    }
    var getuser = () => {
        return {
            uid: uid,
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone: phone,
            img: img,
            list: list
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
})()

export default User;