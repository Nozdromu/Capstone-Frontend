import { io } from "socket.io-client"
import axios from 'axios'
import User from './User'

var AllData = (function () {

    var _isLoaded = false;
    var item = {};
    var list = {};
    var t = [];
    var user=User;
    var socket=io('/', {
        autoConnect: true,
    });
    var socket_user=[];
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
            user._login(val.data.user);
        }else{
            user._setguest(val.data.guestuser);
        }
        socket.emit('passuser',user._getuser());
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
    var getuser=()=>{
        return user;
    }
    var getsocket=()=>{
        return socket;
    }
    var getchatname=()=>{
        return user._getuser().chatname;
    }
    return {
        item: getitem,
        list: getlist,
        load: _load,
        isLoaded: isLoaded,
        addhook: afterupdata,
        getUser:getuser,
        getsocket:getsocket,
        getchatname:getchatname
    };
})()

export default AllData;