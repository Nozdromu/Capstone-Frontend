import { Container, Row, ListGroup } from "react-bootstrap";
import { useState, useEffect } from 'react'
import AllData from './Data';
import axios from "axios";


var socket = AllData.getsocket();
var x = 0;
function Chatlobby() {
    const [userlist, setUserlist] = useState([<ListGroup.Item>{'You-' + AllData.getchatname()}</ListGroup.Item>])
    const [ismound, setmound] = useState(false);
    const [list, setlist] = useState([]);
    useEffect(() => {
        console.log("Mounted");
        if (!ismound) {
            axios.get('/getchatuser').then((res) => {
                console.log(res);
                setlist(res.data.alluser)
                setUserlist(userlist.concat(res.data.alluser.map(val => {
                    if (val != AllData.getchatname()) {
                        console.log(val);
                        return [<ListGroup.Item>{val}</ListGroup.Item>]
                    }
                })))
            })
            AllData.getsocket().on('login', (data) => {
                console.log(data);
                if (!list.includes(data.chatname)) {
                    var newlogin = [<ListGroup.Item id={x}>{data.chatname}</ListGroup.Item>];
                    x++;
                    setUserlist(userlist.concat(newlogin))
                }

            })
            setmound(true);
        }
    }, []);




    return (
        <Container>
            <ListGroup>
                {userlist}
            </ListGroup>

        </Container>
    )
}

export default Chatlobby