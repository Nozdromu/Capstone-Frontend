import { Container, Row, Col } from "react-bootstrap";
import { Children } from 'react';

function Chatwindow(props) {
    const roomname = props.room;

    return (<Container>
        {/* {props.th.map(val=>{
            return val;
        })} */}
        {props.children}
    </Container>)
}

export default Chatwindow