import { Container, Row, ListGroup } from "react-bootstrap";
import { useState, useEffect } from 'react'
import AllData from './Data';
import axios from "axios";


var x = 0;
function Chatlobby(props) {
    const [count,setcount]=useState(0);
    const [userlist, setUserlist] = useState([<ListGroup.Item key={count}>{'You-' + AllData.getchatname()}</ListGroup.Item>])
    const [ismound, setmound] = useState(false);
    const [list, setlist] = useState([]);
    
    useEffect(() => {
        setcount(count+1);
        console.log("Mounted");
        if (!ismound) {
            axios.get('/getchatuser').then((res) => {
                console.log(res);
                setlist(res.data.alluser)
                setUserlist(userlist.concat(res.data.alluser.map(val => {
                    if (val.chatname != AllData.getchatname()) {
                        console.log(val);
                        let cc=count;
                        var c=[<ListGroup.Item  key={cc} action onClick={()=>{props.newchat({email:val.email,chatname:val.chatname})}}>{val.chatname}</ListGroup.Item>];
                        cc++;
                        setcount(cc);
                        return c
                    }
                })))
            })
            props.socket.on('login', (data) => {
                console.log(data);
                if (!list.includes(data.chatname)) {
                    let cc=count;
                    var newlogin = [<ListGroup.Item  key={cc} action onClick={()=>{props.newchat({email:data.email,chatname:data.chatname})}}>{data.chatname}</ListGroup.Item>];
                    cc++;
                    setcount(cc);
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