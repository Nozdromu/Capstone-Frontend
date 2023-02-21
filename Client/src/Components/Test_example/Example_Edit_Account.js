import { Card, Row, Col, Form, Button, InputGroup } from 'react-bootstrap'
import { useRef, useState, useEffect } from 'react'
import Api from '../Api'

export default function AccountEdit(prop) {
    const [data, setdata] = useState({})
    const [updatetable, setupdatetable] = useState({})
    const [props, setprops] = useState(prop)
    const [uid, setuid] = useState(0);
    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [login, setlogin] = useState(false)

    useEffect(() => {
        setprops(prop)
    }, [prop])

    useEffect(() => {
        if (props.data !== undefined) {
            setuid(props.data.uid);
            setusername(props.data.username);
            setdata(props.data);
            setemail(props.data.email)
            setphone(props.data.phone);
            setfirstname(props.data.firstname)
            setupdatetable(props.setupdatetable);
            setlastname(props.data.lastname);
        } else {
            setlogin(false)
        }
    }, [props])

    var inputs = {
        user_uid: useRef(null),
        user_username: useRef(null),
        user_email: useRef(null),
        user_phone: useRef(null),
        user_firstname: useRef(null),
        user_lastname: useRef(null)
    }
    var edit_user = (event) => {
        event.preventDefault();
        var _data = {
            uid: parseInt(uid),
            email: email,
            phone: phone,
            firstname: firstname,
            lastname: lastname,
            username: username,
        }
        console.log(_data);
        Api.user.update(_data, (res) => {
            console.log(res);
        })
        // Api.listing.update(_data, (res) => {
        //     console.log(res)
        //     //update list table
        //     //props.updatetable();
        // })
    }
    var delete_user = () => {
        Api.user.delete({ uid: uid }, (res) => {
            console.log(res);
            //props.updatetable();
        })
    }

    // var startcreate = (event) => {
    //     event.preventDefault();
    //     setcreatemode(!createmode);
    //     if (!createmode) {
    //         settitle('');
    //         setlocation('');
    //         setdescription('');
    //         setlat('');
    //         setlng('');

    //     } else {
    //         settitle(props.data.title)
    //         setdescription(props.data.description);
    //         setlocation(props.data.location)
    //         setlat(props.data.lat);
    //         setlng(props.data.lng);
    //     }
    // }



    var onchange = (event, keys) => {

        switch (keys) {
            case 'username':
                setusername(event.target.value);
                break;
            case 'firstname':
                setfirstname(event.target.value);
                break;
            case 'lastname':
                setlastname(event.target.value);
                break;
            case 'email':
                setemail(event.target.value);
                break;
            case 'phone':
                setphone(event.target.value);
                break;
            default:
        }
    }

    return (<Card>
        <Card.Header>
            <Row>
                <Col>
                    Read/Edit/Delete listing
                </Col>

            </Row>

        </Card.Header>
        <Card.Body>
            <Form id='edit_user' onSubmit={edit_user}>
                <fieldset disabled={login}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="edit_user_uid">
                                <Form.Label>UID</Form.Label>
                                <Form.Control onChange={(e) => onchange(e, 'uid')} value={uid} required={true} ref={inputs.user_uid} type="input" disabled={true} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="edit_user_username">
                                <Form.Label>username</Form.Label>
                                <Form.Control onChange={(e) => onchange(e, 'username')} value={username} required={true} ref={inputs.user_username} type="input" placeholder="Enter username" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="edit_user_email">
                                <Form.Label>email</Form.Label>
                                <Form.Control onChange={(e) => onchange(e, 'email')} value={email} required={true} ref={inputs.user_email} type="input" placeholder="Enter email" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="edit_user_phone">
                                <Form.Label>phone</Form.Label>
                                <Form.Control onChange={(e) => onchange(e, 'phone')} value={phone} required={true} ref={inputs.user_phone} type="input" placeholder="Enter phone" />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="edit_user_firstname">
                                <Form.Label>firstname</Form.Label>
                                <Form.Control onChange={(e) => onchange(e, 'firstname')} required={true} value={firstname} ref={inputs.user_firstname} type="input" placeholder="enter firstname" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="edit_user_lastname">
                                <Form.Label>lastname</Form.Label>
                                <Form.Control onChange={(e) => onchange(e, 'lastname')} required={true} value={lastname} ref={inputs.user_lastname} type="input" placeholder="enter lastname" />
                            </Form.Group>
                        </Col>
                    </Row>
                </fieldset>
            </Form>
        </Card.Body>
        <Card.Footer>
            <Row>
                <Col>
                    <Button form='edit_user' type="submit" value='submit' style={{ width: '100%' }} >Edit</Button>
                </Col>
                <Col>
                    <Button onClick={delete_user} style={{ width: '100%' }} >Delete</Button>
                </Col>
            </Row>
        </Card.Footer>
    </Card>)
}