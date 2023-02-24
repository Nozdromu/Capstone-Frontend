import Accountpage from './Account'
import Itemgrid from './Itemgrid';
import Signup from "./Signin";
import Api from './Api';
import Map from './Test_example/Google_map_example'
import Newchat from './Newchat'
import Testpage from './Test_example/Testhome'
import Listing from "../Object/listing";
import Item from './../Object/item';
import User from "../Object/user";


var Core = (function () {

    var _isLoaded = false;
    var item = {};
    var list = {};
    var hook = [];
    var isdev = false;
    var user = new User({}, true);

    var route = {
        Homepage: { path: '/', name: 'Spiffo-Slist', page: <Itemgrid /> },
        Accountpage: { path: '/account', name: 'Account', page: <Accountpage /> },
        Mappage: { path: '/map', name: 'Api_Test', page: <Testpage /> },
        Chatpage: { path: '/chat', name: 'Chat', page: <Newchat /> },
        Signup: { path: '/sigup', name: 'Signup', page: <></> },
    }

    var hookcount = 0;
    if (!_isLoaded) {
        Api.data.getlodingdata().then(res => {
            _load(res);
        })
    }

    var _load = (val) => {
        console.log(val)
        item = [];
        list = [];

        /////////////////////////////////////

        val.data.data.listings.forEach(element => {
            var x = new Listing(element, true);
            list.push(x);
        });

        val.data.data.items.forEach(element => {
            var x = new Item(element, true);

            item.push(x);
        });


        ////////////////////////////////////

        if (val.data.islogin) {
            user.load(val.data.user);
        }

        _isLoaded = true;
        proseecHook();
    }

    /////////////////////////////////////
    // hook list
    var proseecHook = () => {
        if (_isLoaded)
            for (var i = hookcount; i < hook.length; i++) {
                hook[i].apply();
                hookcount++;
            }
    }
    //////////////////////////////////////


    return {
        load: _load,
        item: () => {
            return item;
        },
        list: () => {
            return list;
        },
        isLoaded: () => {
            return _isLoaded;
        },
        addhook: (callback) => {
            hook.push(callback);
            proseecHook();
        },
        getUser: () => {
            return user;
        },
        getchatname: () => {
            return user.chatname;
        },
        getpages: () => {
            return route;
        },
        getrooms: () => {
            return user.rooms
        }
    };
})()

export default Core;