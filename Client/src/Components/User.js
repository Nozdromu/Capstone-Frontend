
import { useState } from 'react';

var User = (function () {

    var uid = 0;
    var firstname = '';
    var lastname = '';
    var email = '';
    var phone = '';
    var img='';

    var login = (val) => {
        uid = val.uid;
        firstname = val.firstname;
        lastname = val.lastname;
        email = val.email;
        phone = val.phone;
        img=val.profilepicture;
        setsession();
    }
    var loadsession = () => {
        if (sessionStorage.islogin) {
            uid = sessionStorage.getItem('uid');
            firstname = sessionStorage.getItem('firstname');
            lastname = sessionStorage.getItem('lastname');
            email = sessionStorage.getItem('email');
            phone = sessionStorage.getItem('phone');
            img=sessionStorage.getItem('img')
        }

    }
    var setsession = () => {
        sessionStorage.setItem('islogin', true)
        sessionStorage.setItem('uid', uid);
        sessionStorage.setItem('firstname', firstname);
        sessionStorage.setItem('lastname', lastname);
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('phone', phone);
        sessionStorage.setItem('img', img);
    }
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
            img:img
        }
    }


    return {
        _login: login,
        _load: loadsession,
        _logout: logout,
        _getuser:getuser,
        _islogin:sessionStorage.getItem('islogin')=='true'?true:false
    };
})()

export default User;