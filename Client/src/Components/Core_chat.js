
import { Nav, Tab } from 'react-bootstrap';
import Chatlobby from "./Chatlobby";
import Chatwindow from './Chatwindow'
import Core from './Core';
import { axios } from 'axios';
function Core_chat() {
    var rooms = {
        userlist: {
            tab: <Tab.Pane key={'userlist'} eventKey="Users"><Chatlobby socket={() => Core.getsocket()} newchat={create_room}></Chatlobby></Tab.Pane>
        },
        publicroom: {

        }
    };
    var updatetab;
    var updatewindow;
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
            tab = <Nav.Item key={to.firstname}><Nav.Link eventKey={to.firstname}>{to.firstname}</Nav.Link></Nav.Item>;
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
    var create_room = (user_email) => {
        axios.get('/create_room', { params: { email: user_email } }).then(res => {
            var rid = res.data.room;
            rooms[rid] = new room();
            rooms[rid].load({ roomid: rid, user: res.data.user, })
        })
    }

    return {
        create_room: create_room,

        sendmessage: (message, roomid) => {
            var _room = rooms[roomid];
            var data = { chatname: _room.to.chatname, room: _room.roomid, message: message }
            Core.getsocket().emit('chat', data);
        },
        settab: (fun) => {
            updatetab = fun;
        },
        setwindow: (fun) => {
            updatewindow = fun;
        },
        updatetab:()=>{
            updatetab()
        }
    }

}