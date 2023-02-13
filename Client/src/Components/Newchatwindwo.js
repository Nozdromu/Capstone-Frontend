import { Container, Row } from "react-bootstrap";
import { useState } from 'react';
import Core from './Core';

function Chatwindow(props) {
    const [history, sethistory] = useState(Core.rooms[props.roomid].history)
    const [count, setcount] = useState(0);
    Core.rooms[props.roomid].updatewindows = sethistory;
    return (<Container style={{ maxHeight: '100%' }}>
        <div style={{ 'textAlign': 'center' }}>{props.roomid}</div>
        {history.map(val => {
            var _style = 'left';
            var _classname = 'text-start';
            if (val.chatname === Core.getUser().chatname) {
                _style = 'right';
                _classname = 'text-start'
            }
            setcount(count => count + 1);
            return <Row key={count}>
                <p style={{ 'textAlign': _style, float: _style }} className={_classname}>
                    {val.chatname}
                </p>
                <div>
                    <p id="tooltip" role="tooltip" style={{ float: _style }}>
                        {val.message}
                    </p>
                </div>
            </Row >
        })}
    </Container>)
}

export default Chatwindow