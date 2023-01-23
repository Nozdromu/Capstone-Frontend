import { Button, Card, Form, FormGroup, Row } from "react-bootstrap";
import { useState, useRef, useEffect, useCallback } from 'react'
import myio from './socketIO'
import Chat from './Chat';

var chatHistory = [];
var keycount = 0;
var ismount = false;



function ChatApp(props) {

    var [chatlist, setChatlist] = useState([]);
    var [right, setright] = useState(0);
    var textbox = useRef(null);
    useEffect(() => {
            myio.setrecive(handleLeftchat);
    });

    var handleLeftchat = (data) => {
        console.log(data);
        keycount++;
        var x = [<Row key={right}><a style={{ 'textAlign': 'left', float: 'left' }} className=' text-start'>{data}</a></Row>]
        setright(right + 1);
        setChatlist(chatlist.concat(x));
    }
    var handleRightchat = () => {
        keycount++;
        var x = [<Row key={right}><a style={{ 'textAlign': 'right', float: 'right' }} className=' text-end'>{textbox.current.value}</a></Row>]
        setright(right + 1);
        myio.sendMessage(textbox.current.value);
        setChatlist(chatlist.concat(x))
        console.log(keycount);
    }


    // const onLoad = useCallback(function callback() {


    // }, [])
    return (
        <Card>
            <Card.Header>
                Chat
                <a>{right}</a>
            </Card.Header>
            <Card.Body>
                {chatlist}
            </Card.Body>
            <Card.Footer>
                <FormGroup><Form.Control type="input" placeholder="Enter Here" ref={textbox} /><Button onClick={handleRightchat}>submit</Button></FormGroup>
            </Card.Footer>
        </Card>
    )
}

export default ChatApp;