
import React, { useState, useRef } from 'react';
import { CardImg, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import User from './User'
import { Row, Col } from 'react-bootstrap';


function Accountpage() {
    console.log(User._getuser());
    return (
        <Container>
            <Row className="align-items-center justify-content-center">
                <Card style={{ width: '25em' }}>
                    <Card.Header>
                        <div className="rect-img-container" >
                            <Card.Img className='rect-img' variant="top" src={User._getuser().img} />
                        </div>
                        {/* <CardImg src={User._getuser().img}>                 </CardImg>*/}


                    </Card.Header>
                    <Card.Body>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Row className='d-flex justify-content-between'>
                                <Col>
                                    <Form.Label >Frist name </Form.Label>
                                </Col>
                                <Col>
                                    <a style={{ 'textAlign': 'right', float: 'right' }} className=' text-end'>edit</a>
                                </Col>
                            </Row>
                            <Form.Control type="input" placeholder="Enter Frist name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Row className='d-flex justify-content-between'>
                                <Col>
                                    <Form.Label >Last name </Form.Label>
                                </Col>
                                <Col>
                                    <a style={{ 'textAlign': 'right', float: 'right' }} className=' text-end'>edit</a>
                                </Col>
                            </Row>
                            <Form.Control type="input" placeholder="Enter Last name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Row className='d-flex justify-content-between'>
                                <Col>
                                    <Form.Label >Email </Form.Label>
                                </Col>
                                <Col>
                                    <a style={{ 'textAlign': 'right', float: 'right' }} className=' text-end'>edit</a>
                                </Col>
                            </Row>
                            <Form.Control type="input" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Row className='d-flex justify-content-between'>
                                <Col>
                                    <Form.Label >Phone number </Form.Label>
                                </Col>
                                <Col>
                                    <a style={{ 'textAlign': 'right', float: 'right' }} className=' text-end'>edit</a>
                                </Col>
                            </Row>
                            <Form.Control type="input" placeholder="Enter Phone number" />
                        </Form.Group>

                    </Card.Body>
                    <Card.Footer>

                    </Card.Footer>
                </Card>
            </Row>

        </Container >
    )
}

export default Accountpage;