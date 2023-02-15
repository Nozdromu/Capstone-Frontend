
import { Nav, Tab, Row } from 'react-bootstrap';
import Chatlobby from "./Chatlobby";
import Core from './Core';
import axios from 'axios';
import Chatroom from './chat_room'

export default function Core_chat() {
    var currentroom = 'publicroom';

    var create_room = (user) => {
        axios.get('/create_room', { params: { user } }).then((res) => {
            console.log(res);
            var rid = res.data.email;
            rooms[rid] = Chatroom();
            rooms[rid].load({ roomid: rid, user: { email: res.data.email, chatname: res.data.chatname }, history: [] })
            console.log(res);
            update();
        })
    }

    var rooms = {
        userlist: {
            tab: () => { return <Nav.Item key={'userlist'}><Nav.Link eventKey="Users">User List</Nav.Link></Nav.Item> },
            window: () => { return <Tab.Pane key={'userlist'} eventKey="Users"><Chatlobby newchat={create_room}></Chatlobby></Tab.Pane> }
        },
    };
    var socket = Core.getsocket();

    socket.on('publicroom', (data) => {
        console.log(data);
    })
    socket.on('chat', (data) => {
        console.log(data);
        if (rooms[data.roomid] === undefined) {
            rooms[data.roomid] = Chatroom();
            rooms[data.roomid].load({ roomid: data.roomid, user: { email: data.roomid, chatname: data.chatname }, history: [] })
            update()
        }
        new_message(false, data.chatname, data.message, data.roomid);
    })
    socket.on('unauthorized', data => {
        Core.getUser()._logout();
    })

    var new_message = (LR, chatname, message, roomid) => {
        var _room = rooms[roomid];
        var _style = LR ? 'right' : 'left';
        var _classname = LR ? 'text-end' : ' text-start'

        _room.newmessage(
            <Row key={_room.gethistorycount()}>
                <p style={{ 'textAlign': _style, float: _style }} className={_classname}>
                    {chatname}
                </p>
                <div>
                    <p id="tooltip" role="tooltip" style={{ float: _style }}>
                        {message}
                    </p>
                </div>
            </Row >
        )

    }


    rooms['publicroom'] = Chatroom();
    rooms['publicroom'].load({ roomid: 'publicroom', user: { email: 'publicroom', chatname: 'Publicroom' }, history: [] })

    console.log(rooms)

    var fpage;

    var update = () => {
        fpage();
        console.log(rooms)
    }

    return {
        create_room: create_room,

        sendmessage: (message) => {
            var data;

            if (currentroom === 'publicroom') {
                data = { chatname: Core.getchatname(), roomid: currentroom, message: message };
            } else {
                data = { chatname: Core.getchatname(), roomid: currentroom, message: message };

            }
            new_message(true, data.chatname, message, currentroom)
            Core.getsocket().emit('chat', data);
            // update()
        },
        setpage: (fun) => {
            fpage = fun;
        },
        updatepage: () => {
            return update()
        },
        getrooms: () => {
            return rooms;
        },
        getroom: (roomid) => {
            return rooms[roomid];
        },
        setcurrentroom: (roomid) => {
            currentroom = roomid;
        }
    }

}