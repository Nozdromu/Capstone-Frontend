import React, { useState,useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function Signup(props) {
    const emailInput = useRef(null);
    const psdInput=useRef(null);
    const _email = (<Form.Control ref={emailInput} type="email" placeholder="Enter email" />);
    const _psd=(<Form.Control ref={psdInput} type="password" placeholder="Password" />);
    const handlesignup = () => {
        var account = {
            email:emailInput.current.value,
            password:psdInput.current.value
        }
        console.log(account);
        axios.get('/signup',{ params: account}).then(res=>{
            console.log(res);
        })
    }


    return (
        <>

            <Modal
                show={props.show}
                onHide={props.handleClose}
                backdrop="static"
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Sign up !</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form action='/signup'>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            {_email}
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            {_psd}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" onClick={handlesignup}>
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Signup;