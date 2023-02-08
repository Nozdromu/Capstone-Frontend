import { Button, Card, Form, Row } from "react-bootstrap";
import { useState, useRef } from 'react';
import Core from './Core';


export default function Smallchat(props) {
    const [message, setmessahe] = useState([]);
    const [count, setcount] = useState([]);
    const [show, setshow] = useState(true);
    var input = useRef(null);
    Core.getsocket().on('chat', (data) => {
        newmessage('right', data);
    });
    Core.Chatload.s_chat = true;
    console.log(props);
    var newmessage = (LR, data) => {
        var _style = LR ? 'right' : 'left';
        var _classname = LR ? 'text-end' : ' text-start'
        let new_message = message;
        new_message = new_message.concat(<Row key={count}>
            <p1 style={{ 'textAlign': _style, float: _style }} className={_classname}>
                {data.chatname}
            </p1>
            <div>
                <p1 id="tooltip" role="tooltip" style={{ float: _style }}>
                    {data.message}
                </p1>
            </div>
        </Row >)
        setmessahe(message => new_message);
        if (LR === 'right') {
            Core.getsocket().emit('chat', { message: data.message, chatname: Core.getUser()._getuser().chatname, room: props.room })
        }
    }

    return show ? (
        <Card style={{
            position: 'fixed',
            bottom: '2em',
            right: '2em',
            translate: 'middle',
            minWidth: '20em',
            zIndex: '9999'
        }} >
            <Card.Header>
                {props.chatname}
            </Card.Header>
            <Card.Body>
                {message}
            </Card.Body>
            <Card.Footer>
                <Form.Group>
                    <Form.Control ref={input} type="input"></Form.Control>
                </Form.Group>
                <Button onClick={() => newmessage('right', { chatname: Core.getUser()._getuser().chatname, message: input.current.value })}>chat</Button>
            </Card.Footer>
        </ Card>
    ) : (<></>)
}