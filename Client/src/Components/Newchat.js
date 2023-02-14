import { Button, Card, Container, Form, FormGroup, Row, Col, Tab, Nav } from "react-bootstrap";
import { useState, useRef, useEffect } from 'react';
import Chatlobby from "./Chatlobby";
import Core from './Core';
import Chatwindow from './Chatwindow'
import axios from 'axios'

export default function Newchat() {
    const [roomid, setroomid] = useState('publicroom');
    // const [tabs, settabs] = useState(Core.rooms.gettabs());
    // const [windows,setwindow]= useState(Core.rooms.getwindows())
    const [rooms, setrooms] = useState(Core.getrooms().getrooms());
    var textbox = useRef(null);
    function handleKeyPress(e) {
        if (e.key === 'Enter') {

            handleRightchat();
        }
    }
    var handleRightchat = () => {
        //Core.room
    }
    useEffect(() => {
        Core.getrooms().updaterooms(setrooms);
    }, [])
    return (
        <Container fluid="md" style={{}}>
            <Card style={{ width: '100%', maxHeight: '90vh', height: '90vh' }}>
                <Card.Header>
                    {'Chat: ' + roomid}
                </Card.Header>
                <Card.Body >
                    <Tab.Container id="left-tabs-example" defaultActiveKey="publicroom">
                        <Row>
                            <Col sm={3} className='border-end' >
                                <Nav variant="pills" className="flex-column">
                                    {Object.values(rooms).map(value => {
                                        return value.tab;
                                    })}
                                </Nav>
                            </Col>
                            <Col sm={9} style={{ maxHeight: '78vh', overflowY: 'auto' }}>
                                <Tab.Content>
                                    {Object.values(rooms).map(value => {
                                        return value.window;
                                    })}
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Card.Body>
                <Card.Footer>
                    <FormGroup>
                        <Row>
                            <Col>
                                <Form.Control type="input" placeholder="Enter Here" ref={textbox} onKeyDown={(e) => handleKeyPress(e)} />
                            </Col>
                            <Col xs md lg="4">
                                <Button onClick={handleRightchat}>submit</Button>
                            </Col>
                        </Row>
                    </FormGroup>
                </Card.Footer>
            </Card>

        </Container>

    )

}