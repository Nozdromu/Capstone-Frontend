
import React, { useState, useEffect, useRef } from 'react';
import { Button, Container, Tab, Tabs, Accordion } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import Core from './Core';
import Api from './Api';

var ListInfo = (props) => {
    return (
        <Accordion.Item eventKey={props.data.gsid}>
            <Accordion.Header>{'#' + props.data.gsid}</Accordion.Header>
            <Accordion.Body>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Row className='d-flex justify-content-between'>
                        <Col>
                            <Form.Label >Street</Form.Label>
                        </Col>
                        <Col>
                            <a style={{ 'textAlign': 'right', float: 'right' }} className=' text-end'>edit</a>
                        </Col>
                    </Row>
                    <Form.Control type="input" placeholder="Enter Street" value={props.data.street} disabled />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Row className='d-flex justify-content-between'>
                        <Col>
                            <Form.Label >City</Form.Label>
                        </Col>
                        <Col>
                            <a style={{ 'textAlign': 'right', float: 'right' }} className=' text-end'>edit</a>
                        </Col>
                    </Row>
                    <Form.Control type="input" placeholder="Enter City" value={props.data.city} disabled />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Row className='d-flex justify-content-between'>
                        <Col>
                            <Form.Label >State</Form.Label>
                        </Col>
                        <Col>
                            <a style={{ 'textAlign': 'right', float: 'right' }} className=' text-end'>edit</a>
                        </Col>
                    </Row>
                    <Form.Control type="input" placeholder="Enter State" value={props.data.states} disabled />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Row className='d-flex justify-content-between'>
                        <Col>
                            <Form.Label >Zip Code</Form.Label>
                        </Col>
                        <Col>
                            <a style={{ 'textAlign': 'right', float: 'right' }} className=' text-end'>edit</a>
                        </Col>
                    </Row>
                    <Form.Control type="input" placeholder="Enter Zip Code" value={props.data.zip} disabled />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Button style={{ width: '100%' }}>Remove List</Button>
                </Form.Group>
            </Accordion.Body>
        </Accordion.Item>
    )
}


function Accountpage(prop) {
    var ismount = false
    var user =Core.getUser();
    const [props, setprops] = useState(prop)

    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [address1, setaddress1] = useState('');
    const [address2, setaddress2] = useState('');
    const [city, setcity] = useState('');
    const [ustate, setustate] = useState('');
    const [zip, setzip] = useState('');

    const fn = useRef();
    const ln = useRef();
    const em = useRef();
    const ph = useRef();
    const add1 = useRef();
    const add2 = useRef();
    const cit = useRef();
    const st = useRef();
    const zp = useRef();

    const [list, setList] = useState([]);
    console.log(user);
    /*useEffect(() => {
        
        if (!ismount) {
            ismount = true;
            //user.list
            var _list = Api.listing.getbyowner().map(val => {
                return <ListInfo data={val} key={val.gsid} ></ListInfo>
            });
            setList(_list)
        }
    }, []);*/
    
    var edit_user = (event) => {
        event.preventDefault();
        user.update(props.update());
        window.location.reload();

    }


    var onchange = (event, keys) => {

        switch (keys) {
            case 'username':
                user.username = event.target.value
                setusername(user.username);
                break;
            case 'firstname':
                user.firstname = event.target.value
                setfirstname(user.firstname);
                break;
            case 'lastname':
                user.lastname = event.target.value
                setlastname(user.lastname);
                break;
            case 'email':
                user.email = event.target.value
                setemail(user.email);
                break;
            case 'phone':
                user.phone = event.target.value
                setphone(user.phone);
                break;
            case 'address1':
                user.address_line_1 = event.target.value
                setaddress1(user.address_line_1);
                break;
            case 'address2':
                user.address_line_2 = event.target.value
                setaddress2(user.address_line_2);
                break;
            case 'city':
                user.city = event.target.value
                setcity(user.city);
                break;
            case 'state':
                user.state = event.target.value
                setustate(user.state);
                break;
            case 'zip':
                user.zip = event.target.value
                setzip(user.zip);
                break;
            default:
        }
    }

    return (
        <>
            {/* {} */}
            < Container >
                <Row className="align-items-center justify-content-center">
                    <Card style={{ width: '50em' }}>
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
                                    <Form id='edit_user' onSubmit={edit_user}>  
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Row className='d-flex justify-content-between'>
                                            <Col>
                                                <Form.Label >Frist Name </Form.Label>
                                            </Col>
                                        </Row>
                                        <Form.Control onChange={(e) => onchange(e, 'firstname')} required={true} value={firstname} ref={fn} type="input" placeholder="Enter First Name" />

                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Row className='d-flex justify-content-between'>
                                            <Col>
                                                <Form.Label >Last name </Form.Label>
                                            </Col>
                                        </Row>
                                        <Form.Control onChange={(e) => onchange(e, 'lastname')} required={true} value={lastname} ref={ln} type="input" placeholder="Enter Last Name" />
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
                                        <Form.Control onChange={(e) => onchange(e, 'email')} required={true} value={email} ref={em} type="input" placeholder="Enter Email" />

                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Row className='d-flex justify-content-between'>
                                            <Col>
                                                <Form.Label >Address Line 1 </Form.Label>
                                            </Col>
                                        </Row>
                                        <Form.Control onChange={(e) => onchange(e, 'address1')} required={true} value={address1} ref={add1} type="input" placeholder="Address line 1" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Row className='d-flex justify-content-between'>
                                            <Col>
                                                <Form.Label >Address Line 2 </Form.Label>
                                            </Col>
                                        </Row>
                                        <Form.Control onChange={(e) => onchange(e, 'address2')} required={true} value={address2} ref={add2} type="input" placeholder="Address line 2" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Row className='d-flex justify-content-between'>
                                                <Form.Label >City</Form.Label>
                                        <Form.Control onChange={(e) => onchange(e, 'city')} required={true} value={city} ref={cit} type="input" placeholder="City" />
                                                <Form.Label >State</Form.Label>                                        
                                                <Form.Control onChange={(e) => onchange(e, 'state')} required={true} value={ustate} ref={st} type="input" placeholder="State" />
                                    
                                                <Form.Label >Zip</Form.Label>                                      
                                                <Form.Control onChange={(e) => onchange(e, 'zip')} required={true} value={zip} ref={zp} type="input" placeholder="Zip Code" />
                                        </Row>
                                    </Form.Group>


                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Row className='d-flex justify-content-between'>
                                            <Col>
                                                <Form.Label >Phone number </Form.Label>
                                            </Col>
                                        </Row>
                                        <Form.Control onChange={(e) => onchange(e, 'phone')} required={true} value={phone} ref={ph} type="input" placeholder="City" />

                                    </Form.Group>
                                    
                                    <Button>log out</Button>
                                    </Form>
                                </Tab>
                                
                                <Tab eventKey="list" title="List">

                                    <Row className='gy-2' >
                                        <Col className='col-12'>
                                            <Accordion>
                                                {list}
                                            </Accordion>
                                        </Col>
                                        <Col className='col-12'>
                                            <Button style={{ width: '100%' }}>Add new list</Button>
                                        </Col>
                                    </Row>
                                </Tab>

                            </Tabs>


                        </Card.Body>

                    </Card>
                </Row>

            </Container ></>

    )


}

export default Accountpage;