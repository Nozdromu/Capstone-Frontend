import React, { useEffect, useState } from "react";
import {
    Accordion,
    Button,
    Col,
    Container,
    Row,
    Tab,
    Tabs,
    Modal,
} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Core from "./Core"
import User from "../Object/user";
import Api from "./Api";




function Accountpage() {
    
    var user = Core.getUser()
    const [show, setshow] = useState(false)
    const [fname, setfname] = useState(user.first_name)
    // useEffect(() => {
    //     setfname(user.first_name)
    // })
    const handleShow = () => setshow(true);
    const handleClose = () => setshow(false);

    //display the data
    var display = (req) => {
        handleShow();
    }

    var onchange = (event, param) => {
        console.log(event.target.value)
        switch (param) {
            case 0: user.first_name = event.target.value;
                setfname(event.target.value)
                break;
            case 1: user.last_name = event.target.value; break;
            case 2: user.email = event.target.value; break;
            case 3: user.phone_number = event.target.value; break;
            case 4: user.address_line_1 = event.target.value; break;
            case 5: user.address_line_2 = event.target.value; break;
            case 6: user.city = event.target.value; break;
            case 7: user.state = event.target.value; break;
            case 8: user.zip_code = event.target.value; break;
            default: break
        }
    }

    var click = () => {
        var update_data = {
            id: user.id,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
            address_line_1: user.address_line_1,
            address_line_2: user.address_line_2,
            city: user.city,
            state: user.state,
            zip_code: user.zip_code,
            phone_number: user.phone_number,
            re_password: user.re_password
        }
        Api.request.put('/users/' + update_data.id + '/', update_data).then((res) => { display(res) })
    }

    return (
        <>
            {/* {} */}
            < Container >
                <Row className="align-items-center justify-content-center">
                    <Card style={{ width: '25em' }}>
                        <Card.Header>
                            <div className="rect-img-container" >
                                <Card.Img className='rect-img' variant="top" src={user.img} />
                            </div>

                        </Card.Header>
                        <Card.Body>
                            <Tabs
                                defaultActiveKey="profile"
                                id="justify-tab-example"
                                className="mb-3"
                                justify
                            >
                                <Tab eventKey="profile" title="Profile">
                                    <Form id="editUser">
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Row className='d-flex justify-content-between'>
                                                <Col>
                                                    <Form.Label >First name </Form.Label>
                                                </Col>
                                            </Row>
                                            <Form.Control type="input" placeholder="Enter First name" onChange={(e) => onchange(e, 0)} value={fname} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Row className='d-flex justify-content-between'>
                                                <Col>
                                                    <Form.Label >Last name </Form.Label>
                                                </Col>
                                            </Row>
                                            <Form.Control type="input" placeholder="Enter Last name" onChange={(e) => onchange(e, 1)} value={user.lastname} />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Row className='d-flex justify-content-between'>
                                                <Col>
                                                    <Form.Label >Email </Form.Label>
                                                </Col>
                                            </Row>
                                            <Form.Control type="input" placeholder="Enter email" onChange={(e) => onchange(e, 2)} value={user.email} />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Row className='d-flex justify-content-between'>
                                                <Col>
                                                    <Form.Label >Phone number </Form.Label>
                                                </Col>
                                            </Row>
                                            <Form.Control type="input" placeholder="Enter Phone number" onChange={(e) => onchange(e, 3)} value={user.phone} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Row className='d-flex justify-content-between'>
                                                <Col>
                                                    <Form.Label >Addres Line 1 </Form.Label>
                                                </Col>
                                            </Row>
                                            <Form.Control type="input" placeholder="Enter Address Line 1" onChange={(e) => onchange(e, 4)} value={user.address_line_1} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Row className='d-flex justify-content-between'>
                                                <Col>
                                                    <Form.Label >Addres Line 2 </Form.Label>
                                                </Col>
                                            </Row>
                                            <Form.Control type="input" placeholder="Enter Address Line 2" onChange={(e) => onchange(e, 5)} value={user.address_line_2} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Row className='d-flex justify-content-between'>
                                                <Col>
                                                    <Form.Label >City </Form.Label>
                                                </Col>
                                            </Row>
                                            <Form.Control type="input" placeholder="Enter City" onChange={(e) => onchange(e, 6)} value={user.city} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Row className='d-flex justify-content-between'>
                                                <Col>
                                                    <Form.Label >State </Form.Label>
                                                </Col>
                                            </Row>
                                            <Form.Control type="input" placeholder="Enter State" onChange={(e) => onchange(e, 0)} value={user.state} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Row className='d-flex justify-content-between'>
                                                <Col>
                                                    <Form.Label >Zip </Form.Label>
                                                </Col>
                                            </Row>
                                            <Form.Control type="input" placeholder="Enter Zip Code" onChange={(e) => onchange(e, 0)} value={user.Zip_code} />
                                        </Form.Group>
                                        <div>{show}</div>
                                        <Button onClick={click}>
                                            Save
                                        </Button>
                                    </Form>

                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Changes Saved</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Footer>
                                            <Button variant="primary" onClick={handleClose}>
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>

                                </Tab>

                            </Tabs>


                        </Card.Body>

                    </Card>
                </Row>

            </Container ></>

    )
}


export default Accountpage;
