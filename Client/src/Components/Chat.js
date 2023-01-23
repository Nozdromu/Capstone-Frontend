import { Button, Card, Form, FormGroup,Row } from "react-bootstrap";
import {useState, useRef} from 'react'
import myio from './socketIO'

var chatHistory=[];

function ChatApp() {
    var [chatlist,setChatlist]= useState([]);
    var textbox=useRef(null);
    var keycount=0;
    
    myio.setrecive(handleLeftchat);
    var handleLeftchat=(data)=>{
        var x=<Row><a style={{ 'textAlign': 'left', float: 'left' }} className=' text-start'>{data}</a></Row>
        chatHistory.push(x)
        setChatlist(chatHistory);
    }
    var handleRightchat=()=>{
        var x=<Row key={keycount}><a style={{ 'textAlign': 'right', float: 'right' }} className=' text-end'>{textbox.current.value}</a></Row>
        keycount++;
        chatHistory.push(x);
        setChatlist(chatHistory);
        console.log(chatlist);
    }
    return (
        <Card>
            <Card.Header>
                Chat
            </Card.Header>
            <Card.Body>
                {chatlist}
            </Card.Body>
            <Card.Footer>
                <FormGroup><Form.Control type="input" placeholder="Enter Here" ref={textbox}/><Button onClick={handleRightchat}>submit</Button></FormGroup>
            </Card.Footer>
        </Card>
    )
}



export default ChatApp;