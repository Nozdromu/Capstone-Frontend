import React, { useState, useRef, useEffect, useContext } from 'react';
import Signincont from '../App'
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Signin from './Signin'
import Itemdetial from './Itemdetial';
import 'bootstrap/dist/css/bootstrap.min.css'
import { itemdetial, itemshow } from '../App'
import S_chat from './New_s_chat'
import axios from 'axios';

import Core from './Core';

function MyNavbar(props) {
    // const [load, setload] = useState(false);
    const { item, setitem } = useContext(itemdetial)
    const { itemdetialshow, setitemdetialshow } = useContext(itemshow)


    const [username, setusername] = useState(Core.getUser().username)
    const [login, setlogin] = useState(Core.getUser().islogin);

    const [show, setShow] = useState(false);
    const ref = useRef(null);

    const [chatshow, setchatshow] = useState(true);
    const [schat, setschat] = useState(<></>);


    useEffect(() => {
        if (login) {
            setusername(Core.getUser().username)
        }
    }, [login])

    const handleClose = () => {
        setShow(false);
    }
    const handleSignin = () => {
        setlogin(true);
        props.router_login(true);
    }
    const handleShow = () => setShow(true);
    const logout = () => {
        console.log('start logout');
        Core.getUser().logout((data) => {
            console.log(data)
            if (data.data.result) {
                setlogin(false);
                props.router_login(false);
            } else {
                console.log('something wrong')
            }
        })
    }

    var hidechat = () => {
        setchatshow(!chatshow);
    }

    var startchat = (data) => {
        axios.get('/create_room', { params: { uid: item.uid } }).then(res => {
            var data = res.data;
            setschat(<S_chat setshow={hidechat} roomid={data.email} chatname={data.chatname} />)
            setchatshow(true);
        })

    }

    return (<>
        <Navbar bg="light" expand="lg" className='margin-bottom' sticky="top">
            <Container>
                <Navbar.Brand>
                    {props.routes.Homepage.navlink}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        {props.routes.TestAPI.navlink}
                        {props.routes.Mappage.navlink}
                        {props.routes.Signup.navlink}
                        {!login ? <Nav.Link onClick={handleShow}>Login</Nav.Link> : <NavDropdown title={'Hi ' + username} id="navbarScrollingDropdown">
                            <NavDropdown.Item >
                                {props.routes.Accountpage.navlink}
                            </NavDropdown.Item>
                            <NavDropdown.Item >
                                {props.routes.Chatpage.navlink}
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={logout}>Log out</NavDropdown.Item>
                        </NavDropdown>}
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search" />
                        <Button variant="outline-success">Search</Button>
                        {!login ? <div style={{ maxwidth: '100%', Width: '800px' }} ref={ref}>
                        </div> : <></>}
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Signin show={show} onHide={handleClose} signin={handleSignin}></Signin>
        <Itemdetial show={itemdetialshow} onHide={() => setitemdetialshow(false)} data={item} startchat={startchat}></Itemdetial>
        {chatshow ? schat : <></>}
    </>
    );
}

export default MyNavbar;