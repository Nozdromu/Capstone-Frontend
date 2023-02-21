import { io } from "socket.io-client"
import User from './User'
import Accountpage from './Account'
import Itemgrid from './Itemgrid';
import Api from './Api';
import Map from './Test_example/Google_map_example'
import Newchat from './Newchat'
import Core_chat from './Core_chat'

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
    var getpage = (key) => {
        return page[key];
    }
    var page = {}
    var route = {
        Homepage: { path: '/', name: 'Spiffo-Slist', page: <Itemgrid /> },
        Accountpage: { path: '/account', name: 'Account', page: <></> },
        Mappage: { path: '/map', name: 'Map', page: <Map /> },
        Chatpage: { path: '/chat', name: 'Chat', page: <Newchat /> },
        Signup: { path: '/sigup', name: 'Signup', page: <></> },
    }

    var hook = 0;
    var rooms;
    if (!_isLoaded) {
        Api.data.getlodingdata().then(res => {
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
            Chatpage: <Newchat />,
            Accountpage: <Accountpage />,
            Mappage: <Map />,
            Signup: <></>,
            Homepage: <Itemgrid />
        }
        _isLoaded = true;
        proseecHook();
    }
    var socketclose = () => {
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
        socketclose: socketclose,
        getrooms: () => {
            return rooms
        },
        loadrooms: (h) => {
            rooms = new Core_chat(h);
        },
        setchat: chatupdate,
        api: Api,
        Chatload: chat_hook
    };
})()

export default Core;