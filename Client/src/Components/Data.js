
import { useState } from 'react';
import axios from 'axios'
import User from './User'

var AllData = (function () {

    var _isLoaded = false;
    var item = {};
    var list = {};
    var t = []
    var hook = 0;

    if (!_isLoaded) {
        axios.get('/getdata').then(res => {
            _load(res);
        })
    }


    var _load = (val) => {
        item = val.data.data[0];
        list = val.data.data[2];
        if(val.data.islogin){
            User._login(val.data.user);
        }else{
            User._setguest(val.data.guestuser);
        }
        
        _isLoaded = true;
        proseecHook();
    }


    var afterupdata = (callback) => {
        t.push(callback);
        proseecHook();
    }

    var proseecHook=()=>{
        if (_isLoaded)
            for (var i = hook; i < t.length; i++) {
                t[i].apply();
                hook++;
            }
    }

    var getitem = () => {
        return item;
    }

    var getlist = () => {
        return list;
    }
    var isLoaded = () => {
        return _isLoaded;
    }

    return {
        item: getitem,
        list: getlist,
        load: _load,
        isLoaded: isLoaded,
        addhook: afterupdata
    };
})()

export default AllData;