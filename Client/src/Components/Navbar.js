import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Signup from './Signuppage'

function MyNavbar() {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        console.log('closed')
    }
    const handleShow = () => setShow(true);
    const handlechild = () => handleClose;
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
                            <Nav.Link href="#action1">SaleNearYou</Nav.Link>
                            {/* <Nav.Link href="#action2">Account</Nav.Link> */}
                            <NavDropdown title="Account" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#action3">
                                    login
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={handleShow}>
                                    register
                                </NavDropdown.Item>
                                {/* <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                                Something else here
                            </NavDropdown.Item> */}
                            </NavDropdown>
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
            <Signup show={show} onHide={handleClose}></Signup>
        </>


    );
}

export default MyNavbar;