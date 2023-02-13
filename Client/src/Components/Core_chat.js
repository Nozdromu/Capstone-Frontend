
import { Nav, Tab } from 'react-bootstrap';
import Chatlobby from "./Chatlobby";
import Chatwindow from './Chatwindow'
import Core from './Core';
import { axios } from 'axios';
function Core_chat() {

    var create_room = (user_email) => {
        axios.get('/create_room', { params: { email: user_email } }).then(res => {
            var rid = res.data.room;
            rooms[rid] = new room();
            rooms[rid].load({ roomid: rid, user: res.data.user, })
            tabs[rid] = rooms[rid].tab;
            tabs[rid] = rooms[rid].window;
        })
    }

    var rooms = {
        userlist: {
            tab: <Nav.Item key={'userlist'}><Nav.Link eventKey="Users">User List</Nav.Link></Nav.Item>,
            windows: <Tab.Pane key={'userlist'} eventKey="Users"><Chatlobby socket={() => Core.getsocket()} newchat={create_room}></Chatlobby></Tab.Pane>
        },
    };
    var tabs = {};
    var windows = {};
    var updatetabs;
    var updatewindows;
    var socket = Core.getsocket();
    var room = () => {
        var roomid
        var history = [];
        var to;
        var tab;
        var window;
        var updatewindows;
        var updatehistory;
        var load = (data) => {
            roomid = data.room.roomid;
            to = data.user;
            history = data.history;
            tab = <Nav.Item key={roomid}><Nav.Link eventKey={roomid}>{to.firstname}</Nav.Link></Nav.Item>;
            window = <Tab.Pane key={roomid} eventKey={roomid}><Chatwindow room={roomid}></Chatwindow></Tab.Pane>
        }

        return {
            load: load,
            roomid: () => { return roomid },
            tab: () => { return tab },
            window: () => { return window },
            setupdatewindow: (fun) => {
                updatewindows = fun
            },
            setupdatehistory: (fun) => {
                updatehistory = fun
            },
            updatehistory: () => {
                updatehistory(history);
            },
            updatewindows: () => {
                updatewindows(window);
            },
            gethistory: () => {
                return history;
            },
            newmessage: (data) => {
                history.push(data);
                updatehistory(history);
            }
        }
    }

    return {
        create_room: create_room,

        sendmessage: (message, roomid) => {
            var _room = rooms[roomid];
            var data = { chatname: _room.to.chatname, room: _room.roomid, message: message }
            Core.getsocket().emit('chat', data);
        },
        settab: (fun) => {
            updatetabs = fun;
        },
        setwindow: (fun) => {
            updatewindows = fun;
        },
        updatepage: () => {
            updatetabs(tabs);
            updatewindows(windows);
        },
        getrooms:(()=>{
            return rooms;
        })()
    }

}