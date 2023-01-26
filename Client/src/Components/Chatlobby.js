import { Container, Row } from "react-bootstrap";
import { useState } from 'react'
import AllData from './Data';





function Chatlobby() {
    var socket = AllData.getsocket();
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