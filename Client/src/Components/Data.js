
import axios from 'axios'
import User from './User'
import Socket from './socketIO'

var AllData = (function () {

    var _isLoaded = false;
    var item = {};
    var list = {};
    var t = [];
    var user={};
    var socket={};
    var hook = 0;

    if (!_isLoaded) {
        axios.get('/getdata').then(res => {
            _load(res);
        })
    }


    var _load = (val) => {
        item = val.data.data[0];
        list = val.data.data[2];
        user=new User();
        if(val.data.islogin){
            user._login(val.data.user);
        }else{
            user._setguest(val.data.guestuser);
        }
        socket=(new Socket()).socket();
        socket.emit('passuser',user._islogin()?user._getuser():user._getguest());
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
    return {
        item: getitem,
        list: getlist,
        load: _load,
        isLoaded: isLoaded,
        addhook: afterupdata,
        getUser:getuser,
        getsocket:getsocket
    };
})()

export default AllData;