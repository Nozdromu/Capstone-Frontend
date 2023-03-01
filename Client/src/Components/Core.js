import Accountpage from './Account'
import Itemgrid from './Itemgrid';
import Signup from "./Signin";
import Api from './Api';
import Newchat from './Newchat'
import Testpage from './Test_example/Testhome'
import Listing from "../Object/listing";
import Item from './../Object/item';
import User from "../Object/user";
import Newhome from './Newhome';


var Core = (function () {

    var _isLoaded = false;
    var item = {};
    var list = {};
    var hook = [];
    var isdev = false;
    var homepage = <></>;
    var user = new User();
    var route;

    var hookcount = 0;
    if (!_isLoaded) {
        Api.data.getlodingdata().then(res => {
            _load(res);
        })
    }

    var _load = (val) => {
        item = [];
        list = [];

        /////////////////////////////////////

        if (val.server)
            isdev = true;

        /////////////////////////////////////

        /////////////////////////////////////

        val.listings.forEach(element => {
            var x = new Listing(element, true);
            list.push(x);
        });

        val.items.forEach(element => {
            var x = new Item(element, true);

            item.push(x);
        });


        ////////////////////////////////////

        if (val.islogin) {
            user.load(val.user);
        }

        ////////////////////////////////////

        ////////////////////////////////////
        route = {
            Homepage: { path: '', name: 'Spiffo-Slist', page: <Itemgrid /> },
            Accountpage: { path: 'account', name: 'Account', page: <Accountpage /> },
            Mappage: { path: 'map', name: 'Api_Test', page: <Testpage /> },
            Chatpage: { path: 'chat', name: 'Chat', page: <Newchat /> },
            Signup: { path: 'sigup', name: 'Signup', page: <></> },
        }

        _isLoaded = true;
        homepage = <Newhome />;
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
        check_dev: () => {
            return isdev;
        },
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
        },
        gethomepage: () => {
            return homepage;
        }
    };
})()

export default Core;