
import { Nav, Tab } from 'react-bootstrap';
import Chatlobby from "./Chatlobby";
import Chatwindow from './Chatwindow'
import Core from './Core';
import { axios } from 'axios';
function Core_chat() {
    var rooms = {};
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
            tab = <Nav.Item key={to.firstname}><Nav.Link eventKey={to.firstname}>{to.firstname}</Nav.Link></Nav.Item>;
            window = <Tab.Pane key={roomid} eventKey={roomid}><Chatwindow room={roomid}></Chatwindow></Tab.Pane>
        }
    }

    var create_room = (user_email) => {
        axios.get('/create_room', { params: { email: user_email } }).then(res => {
            var rid = res.data.room;
            rooms[rid] = new room();
            rooms[rid].load({ roomid: rid, user: res.data.user, })
        })
    }

    var sendmessage = (message, roomid) => {
        var _room = rooms[roomid];
        var data = { chatname: _room.to.chatname, room: _room.roomid, message: message }
        Core.getsocket().emit('chat', data);
    }

}