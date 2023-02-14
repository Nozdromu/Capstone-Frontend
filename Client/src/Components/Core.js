import { io } from "socket.io-client"
import axios from 'axios'
import User from './User'
import Chat from './Chat'
import Accountpage from './Account'
import Itemgrid from './Itemgrid';

var Core = (function () {

    var _isLoaded = false;
    var item = {};
    var list = {};
    var t = [];
    var user = User;
    var socket = new io('/', {
        autoConnect: false,
        user: user._getuser().email
    })
    var socket_user = [];
    var pages = {
        Homepage: {path:'/',name:'Spiffo-Slist',page:<Itemgrid />},
        Accountpage:{path:'/account',name:'Account',page:<Accountpage />} ,
        Mappage: {path:'/map',name:'Map',page:<></>},
        Chatpage: {path:'/chat',name:'Chat',page:<Chat socket={socket} />},
        Signup: {path:'/sigup',name:'Signup',page:<></>},
    }

    var hook = 0;

    if (!_isLoaded) {
        axios.get('/getdata').then(res => {
            _load(res);
        })
    }

    var _load = (val) => {
        item = val.data.data[0];
        list = val.data.data[2];
        if (val.data.islogin) {
            user._login(val.data.user);
            opensocket();
        }
        _isLoaded = true;
        proseecHook();
    }

    var opensocket = () => {
        socket.connect();
        socket.emit('passuser', user._getuser());
    }


    var afterupdata = (callback) => {
        t.push(callback);
        proseecHook();
    }

    var proseecHook = () => {
        if (_isLoaded)
            for (var i = hook; i < t.length; i++) {
                t[i].apply();
                hook++;
            }
    }

    var getchatpage = () => {
        return <Chat socket={socket} />;
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
    var getuser = () => {
        return user;
    }
    var getsocket = () => {
        return socket;
    }
    var getchatname = () => {
        return user._getuser().chatname;
    }
    var getpages = () => {
        return pages;
    }
    return {
        item: getitem,
        list: getlist,
        load: _load,
        isLoaded: isLoaded,
        addhook: afterupdata,
        getUser: getuser,
        getsocket: getsocket,
        getchatname: getchatname,
        getpages:getpages,
        opensocket, opensocket
    };
})()

export default Core;