import { io } from "socket.io-client"
import User from './User'
import Chat from './Chat'
import Itemgrid from './Itemgrid';
import Appapi from './Api';
import Map from './Test_example/Google_map_example'
import { Navigate } from 'react-router-dom'

var Core = (function () {

    var _isLoaded = false;
    var chat_hook = {
        chat: false,
        login: false,
        s_chat: false
    }
    var item = {};
    var list = {};
    var t = [];
    var user = User;
    var socket = {};
    var chatupdate = {};
    var Api = Appapi();
    var getpage = (key) => {
        return page[key];
    }
    var page = {}
    var route = {
        Homepage: { path: '/', name: 'Spiffo-Slist', page: () => getpage('Homepage') },
        Accountpage: { path: '/account', name: 'Account', page: () => getpage('Accountpage') },
        Mappage: { path: '/map', name: 'Map', page: () => getpage('Mappage') },
        Chatpage: { path: '/chat', name: 'Chat', page: () => getpage('Chatpage') },
        Signup: { path: '/sigup', name: 'Signup', page: () => getpage('Signup') },
    }

    var hook = 0;

    if (!_isLoaded) {
        Api.test.getlodingdata().then(res => {
            _load(res);
        })
    }

    var setSocket = () => {
        if (socket.id === undefined)
            socket = new io('/', {
                autoConnect: false,
                query: {
                    user_email: user._getuser().email,
                    user_uid: user._getuser().uid,
                }
            })
    }

    var _load = (val) => {
        item = val.data.data[0];
        list = val.data.data[2];
        if (val.data.islogin) {
            user._login(val.data.user);
        }
        page = {
            Chatpage: <Chat fullscreen={true} socket={socket} />,
            Accountpage: <></>,
            Mappage: <Map />,
            Signup: <></>,
            Homepage: <Itemgrid />
        }
        _isLoaded = true;
        proseecHook();
    }
    var socketclose=()=>{
        socket.disconnect();
    }
    var _opensocket = () => {
        setSocket();
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
        return route;
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
        getpages: getpages,
        opensocket: _opensocket,
        socketclose:socketclose,
        setchat: chatupdate,
        api: Api,
        Chatload: chat_hook
    };
})()

export default Core;