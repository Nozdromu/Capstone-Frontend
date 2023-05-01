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
//import Testmap from './Test_example/maptest';
import MyComponent from './Test_example/Google_map_example';


var Core = (function () {

    var _isLoaded = false;
    var item = {};
    var list = {};
    var hook = [];
    var isdev = false;
    var homepage = <></>;
    var user;
    var route;

    var hookcount = 0;


    var _load = (val) => {
        item = [];
        list = [];

        /////////////////////////////////////

        if (val.server)
            isdev = true;

        Api.setdev(isdev)
        user = new User({}, isdev);
        /////////////////////////////////////

        /////////////////////////////////////

        val.listings.forEach(element => {
            var x = new Listing(element, isdev);
            list.push(x);
        });

        val.items.forEach(element => {
            var x = new Item(element, isdev);

            item.push(x);
        });


        ////////////////////////////////////

        if (val.islogin) {
            user.load(val.user);
        }

        ////////////////////////////////////

        ////////////////////////////////////
        route = {
            Homepage: { path: '', name: "Spiffo's List", page: <Itemgrid /> },
            Accountpage: { path: 'account', name: 'Account', page: <Accountpage /> },
            Mappage: { path: 'map', name: 'Api_Test', page: <Testpage /> },
            Chatpage: { path: 'chat', name: 'Chat', page: isdev ? <Newchat /> : <></> },
            Signup: { path: 'sigup', name: 'TestMap', page: <MyComponent/> },
            TestMap: {path: 'testmap', name:'Test_Map', page: <MyComponent/>},

        }

        _isLoaded = true;
        homepage = <Newhome />;
        proseecHook();
    }
    if (!_isLoaded) {
        Api.data.getlodingdata(_load)
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