import { Button, Card, Container, Form, FormGroup, Row, Col, Tab, Nav } from "react-bootstrap";
import { useState, useRef, useEffect } from 'react';
import Chatlobby from "./Chatlobby";
import Core from './Core';
import Chatwindow from './Chatwindow'
import axios from 'axios'




function ChatApp(props) {

    const [chatlist, setChatlist] = useState({
        tab: [],
        chathistory: {},
        windows: []
    });

    const [chatwindow, setchatwindow] = useState([]);
    const [chattab, setchattab] = useState([]);
    const [chathistory, setchathistory] = useState([])
    let chatw = chatwindow;
    let chatt = chattab;
    let chath = chathistory;

    var [count, setcount] = useState(0);
    let _count = count;
    var setpage = (newchat) => {
        setChatlist(newchat);
    }

    var [ismount, setmount] = useState(false);
    var [right, setright] = useState(0);

    var create_chat = (touser) => {
        console.log('click')
        axios.get('/create_room', { params: touser }).then(res => {
            //create_room(res.data.chatname, res.data.room)
            chatlist.tab = chatlist.tab.concat([<Nav.Item key={count}><Nav.Link eventKey={res.data.room} onClick={() => { changeroom(res.data.room) }}>{res.data.chatname}</Nav.Link></Nav.Item>])
            chatlist.chathistory[res.data.room] = [<Row key={res.data.room}><a style={{ 'textAlign': 'left', float: 'left' }} className=' text-start'>{'start talk to ' + res.data.chatname} </a></Row>];
            chatlist.windows = chatlist.windows.concat([<Tab.Pane key={res.data.room} eventKey={res.data.room}><Chatwindow room={res.data.room} th={chatlist.chathistory[res.data.room]} >{chatlist.chathistory[res.data.room]}</Chatwindow></Tab.Pane>]);
            setpage(chatlist);
            setcount(count => count + 1);
            console.log(chatlist)
        })
    }

    if (!ismount) {
        console.log('start')
        chatlist.tab = [<Nav.Item key={'publicroom'}> <Nav.Link eventKey={'publicroom'} onClick={() => { changeroom("publicroom") }}>publicroom</Nav.Link></Nav.Item>]
        chatlist.chathistory['publicroom'] = [<Row key={'publicroom'}><a style={{ 'textAlign': 'left', float: 'left' }} className=' text-start'>start</a></Row>,];
        chatlist.windows = [<Tab.Pane key={'userlist'} eventKey="first"><Chatlobby socket={props.socket} newchat={create_chat}></Chatlobby></Tab.Pane>]
        chatlist.windows = chatlist.windows.concat(<Tab.Pane key={'publicroom'} eventKey='publicroom'><Chatwindow room={'publicroom'} >{chatlist.chathistory['publicroom']}</Chatwindow></Tab.Pane>);
        setcount(count => count + 1);
        setChatlist(chatlist);

        props.socket.on('chat', (data) => {
            console.log(data);
            if (chatlist.chathistory[data.room] == undefined) {
                chatlist.tab = chatlist.tab.concat([<Nav.Item key={count}><Nav.Link eventKey={data.room} onClick={() => { changeroom(data.room) }}>{data.user}</Nav.Link></Nav.Item>])
                chatlist.chathistory[data.room] = [<Row key={data.room}><a style={{ 'textAlign': 'left', float: 'left' }} className=' text-start'>{'start talk to ' + data.user} </a></Row>];
                chatlist.windows = chatlist.windows.concat([<Tab.Pane key={data.room} eventKey={data.room}><Chatwindow room={data.room} th={chatlist.chathistory[data.room]} >{chatlist.chathistory[data.room]}</Chatwindow></Tab.Pane>]);
                setChatlist(chatlist);
                setcount(count => count + 1);
                console.log(chatlist)
            }
            chatlist.chathistory[data.room] = chatlist.chathistory[data.room].concat([<Row key={count}><p style={{ 'textAlign': 'left', float: 'left' }} className=' text-start'>{data.user + ': ' + data.message}</p></Row>])
            var i = 0;
            chatlist.windows.forEach((val, key) => {
                if (val.key == data.room) {
                    i = key;
                }
            })
            chatlist.windows[i] = <Tab.Pane key={data.room} eventKey={data.room}><Chatwindow room={data.room} th={chatlist.chathistory[data.room]} >{chatlist.chathistory[data.room]}</Chatwindow></Tab.Pane>
            setChatlist(chatlist)

            setcount(count => count + 1);
        })
        setmount(true)
    }


    var textbox = useRef(null);
    const [room, setroom] = useState('publicroom');
    var User = Core.getUser();


    var changeroom = (_room) => {
        setroom(_room);
    }

    var chatgroup = {
        room: '',
        tag: {},
        window: {},
        chatlist: {}
    }


    var handleRightchat = () => {
        var _user = User._getuser();
        console.log(room);
        chatlist.chathistory[room] = chatlist.chathistory[room].concat([<Row key={count}><p style={{ 'textAlign': 'right', float: 'right' }} className=' text-end'>{'You:' + _user.chatname + textbox.current.value}</p></Row>])
        var i = 0;
        chatlist.windows.forEach((val, key) => {
            if (val.key == room) {
                i = key;
            }
        })
        chatlist.windows[i] = <Tab.Pane key={room} eventKey={room}><Chatwindow room={room} th={chatlist.chathistory[room]} >{chatlist.chathistory[room]}</Chatwindow></Tab.Pane>
        setpage(chatlist);
        setcount(count => count + 1);
        console.log(_user)
        var data = { user: _user.chatname, room: room, message: textbox.current.value }
        props.socket.emit('chat', data);
        console.log(data);

        console.log(chatlist.chathistory[room]);
    }


    // const onLoad = useCallback(function callback() {
    if (!User._islogin()) {
        return (Core.getitemgrid());
    }

    // }, [])
    return (
        <Container fluid="md">
            <Card style={{ maxWidth: '50em',minWidth:'20em' }}>
                <Card.Header>
                    {'Chat: ' + count + room}
                </Card.Header>
                <Card.Body>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row>
                            <Col sm={3} className='border-end' >
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey="first">User List</Nav.Link>
                                    </Nav.Item>
                                    {chatlist.tab}
                                </Nav>
                            </Col>
                            <Col sm={9}>

                                <Tab.Content>
                                    {/* <Tab.Pane eventKey="first">
                                        <Chatlobby socket={props.socket} newchat={create_chat}></Chatlobby>
                                    </Tab.Pane> */}
                                    {chatlist.windows}
                                </Tab.Content>
                            </Col>

                        </Row>
                    </Tab.Container>
                </Card.Body>
                <Card.Footer>
                    <FormGroup><Row><Col><Form.Control type="input" placeholder="Enter Here" ref={textbox} /></Col><Col xs md lg="2"><Button onClick={handleRightchat}>submit</Button></Col></Row></FormGroup>
                </Card.Footer>
            </Card>

        </Container>

    )
}

export default ChatApp;