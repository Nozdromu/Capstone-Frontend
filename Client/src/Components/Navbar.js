import React, { useState, useRef } from 'react';
import { Button, Popover, Container, Form, Nav, Navbar, NavDropdown, Overlay } from 'react-bootstrap';
import Signin from './Signin'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import Core from './Core';

function MyNavbar(props) {
    var User = Core.getUser();
    const [login, setlogin] = useState(User._islogin);
    const [show, setShow] = useState(false);
    const [chatshow, setchatshow] = useState(false);
    const toggleShow = () => setchatshow(!chatshow);
    const [showpop, setShowpop] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    const handleClick = (event) => {
        setShowpop(!showpop);
        setTarget(event.target);
    };

    const handleClose = () => {
        setShow(false);
    }
    const handleSignin = () => {
        setlogin(true);
    }
    const handleShow = () => setShow(true);
    const logout = () => {
        console.log('start logout');
        Core.api.test.logout().then((data) => {
            console.log(data)
            if (data.data.result) {
                User._logout();
                setlogin(false);
            } else {
                console.log('something wrong')
            }

        })

    }

    // (function () {
    //     User._load();
    // })()
    return (

        <>
            <Navbar bg="light" expand="lg" className='margin-bottom' sticky="top">
                <Container>
                    <Navbar.Brand>
                        {props.routes.Homepage.navlink}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                            {props.routes.Mappage.navlink}
                            {props.routes.Signup.navlink}
                            {!login ? <Nav.Link onClick={handleShow}>Login</Nav.Link> : <NavDropdown title={'Hi ' + User._getuser().firstname} id="navbarScrollingDropdown">
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
                                aria-label="Search"/>
                            <Button variant="outline-success">Search</Button>
                            {Core.getUser()._islogin() ? <div style={{ maxwidth: '100%', Width: '800px' }} ref={ref}>
                                {/* <Button onClick={handleClick}>Chat</Button>

                                <Overlay
                                    show={showpop}
                                    target={target}
                                    placement="bottom"
                                    container={ref}
                                    containerPadding={20}
                                    popover-max-width={"100%"}
                                    style={{ maxWidth: '100%' }}
                                >
                                    <Popover id="popover-contained">
                                        {Core.getpages.Chatpage.}
                                    </Popover>
                                </Overlay> */}
                            </div> : <></>}
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Signin show={show} onHide={handleClose} signin={handleSignin}></Signin>
        </>


    );
}

export default MyNavbar;