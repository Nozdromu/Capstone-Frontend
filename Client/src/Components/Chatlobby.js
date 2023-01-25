import { Container, Row } from "react-bootstrap";
import { useState } from 'react'
import socketio from './socketIO'




function Chatlobby() {
    var socket = socketio.socket();
    const [userlist, setUserlist] = useState([<Row>You</Row>])
    socket.on('login', (data) => {
        var newlogin = [<Row>{data.username}</Row>];
        setUserlist(userlist.concat(newlogin))
    })
    return (
        <Container>
            {userlist}
        </Container>
    )
}

export default Chatlobby