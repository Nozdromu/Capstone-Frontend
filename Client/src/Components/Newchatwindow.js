import { Button, Container } from "react-bootstrap";
import { useState, useEffect } from 'react';
import Core from './Core';

export default function Chatwindow(props) {
    const [history, sethistory] = useState(Core.getrooms().getroom(props.roomid).gethistory());
    const [count, setcount] = useState(0);
    var roomid = props.roomid
    var room = Core.getrooms().getroom(roomid);
    var set = () => {
        sethistory(history => Core.getrooms().getroom(props.roomid).gethistory());
        setcount(count => count + 1)
    }
    room.setupdatehistory(set);
    // Core.getrooms().getroom(props.roomid).setupdatehistory(set);
    useEffect(() => {
        room.setupdatehistory(set);
    }, [])

    return (<Container style={{ maxHeight: '100%' }}>
        <div style={{ 'textAlign': 'center' }}>{props.roomid}</div>
        {history.map(val => {
            return val
        })}
    </Container>)
}
