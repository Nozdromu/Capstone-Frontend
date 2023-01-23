import { Button, Card, Form, FormGroup, Row } from "react-bootstrap";
import { useState, useRef, useEffect, useCallback } from 'react'
import myio from './socketIO'

var chatHistory = [];
var keycount = 0;
var ismount = false;
function ChatApp() {

    var [chatlist, setChatlist] = useState([]);
    var [right, setright] = useState(0);
    var textbox = useRef(null);
    useEffect(() => {
        if (!ismount) {
            myio.setrecive(get_handle);
            console.log("Exucute useEffect");
            ismount = true;
        }

    });

    var get_handle = () => {
        setright(right + 1);
        myio.setrecive(get_handle);
    }
    var handleLeftchat = (data) => {
        console.log(data);
        keycount++;
        var x = [<Row key={keycount}><a style={{ 'textAlign': 'left', float: 'left' }} className=' text-start'>back</a></Row>]
        setChatlist(chatlist.concat(x));
    }
    var handleRightchat = () => {
        keycount++;
        var x = [<Row key={keycount}><a style={{ 'textAlign': 'right', float: 'right' }} className=' text-end'>{textbox.current.value}</a></Row>]
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
                <FormGroup><Form.Control type="input" placeholder="Enter Here" ref={textbox} /><Button onClick={handleRightchat}>submit</Button><Button onClick={handleLeftchat}>handleLeftchat</Button></FormGroup>
            </Card.Footer>
        </Card>
    )
}



export default ChatApp;