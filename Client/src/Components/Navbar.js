import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Signup from './Signuppage'
import User from './User';


function MyNavbar() {
    const [login, setlogin] = useState(sessionStorage.getItem('islogin')=='true'?true:false);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }
    const handleSignin = () => {
        setlogin(true);
    }
    const handleShow = () => setShow(true);
    const logout = () => {
        User._logout();
        setlogin(false);
    }

    var display;
    (function () {
        User._load();
    })()
    return (

        <>
            <Navbar bg="light" expand="lg" className='margin-bottom' sticky="top">
                <Container>
                    <Navbar.Brand href="#">Garage sale</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link >SaleNearYou</Nav.Link>

                            {!login ? <Nav.Link onClick={handleShow}>Login</Nav.Link> : <NavDropdown title={'Hi ' + sessionStorage.getItem('firstname')} id="navbarScrollingDropdown"><NavDropdown.Item href="/account">View Account</NavDropdown.Item><NavDropdown.Item onClick={logout}>Log out</NavDropdown.Item></NavDropdown>}

                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Signup show={show} onHide={handleClose} signin={handleSignin}></Signup>
        </>


    );
}

export default MyNavbar;