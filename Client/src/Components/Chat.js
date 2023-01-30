import { Button, Card, Container, Form, FormGroup, Row, Col, Tab, Nav } from "react-bootstrap";
import { useState, useRef } from 'react'
import Chatlobby from './Chatlobby'
import AllData from './Data';




function ChatApp(props) {

    var [chatlist, setChatlist] = useState([]);
    var [right, setright] = useState(0);
    var textbox = useRef(null);
    var room='room1';
    var User=AllData.getUser();

    AllData.getsocket().on('login',(data)=>{
        console.log(data);
    })
    AllData.getsocket().on('chat', (data) => {
        var x = [<Row key={right}><a style={{ 'textAlign': 'left', float: 'left' }} className=' text-start'>{data.user + ': ' + data.message}</a></Row>]
        setChatlist(chatlist.concat(x))
        setright(right + 1);
    })

    var handleRightchat = () => {
        var _user=User._getuser();
        var x = [<Row key={right}><a style={{ 'textAlign': 'right', float: 'right' }} className=' text-end'>{'You:'+_user.chatname + textbox.current.value}</a></Row>]
        setChatlist(chatlist.concat(x))
        setright(right + 1);
        
        console.log(_user)
        AllData.getsocket().emit('chat', { user: _user.chatname,room:room, message: textbox.current.value });
    }


    // const onLoad = useCallback(function callback() {


    // }, [])
    return (
        <Container fluid="md">
            <Card style={{maxWidth:'50em'}}>
                <Card.Header>
                    Chat
                </Card.Header>
                <Card.Body>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row>
                            <Col sm={3} className='border-end' >
                                <Nav variant="pills"  className="flex-column ">
                                    <Nav.Item>
                                        <Nav.Link eventKey="first">Tab 1</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second">Tab 2</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={9}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">

                                        {chatlist}

                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">

                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Card.Body>
                <Card.Footer>
                    <FormGroup><Row><Col><Form.Control type="input" placeholder="Enter Here" ref={textbox} /></Col><Col xs md lg="2"><Button onClick={handleRightchat}>submit</Button></Col></Row></FormGroup>
                </Card.Footer>
            </Card>
            <Chatlobby></Chatlobby>
        </Container>

    )
}

export default ChatApp;