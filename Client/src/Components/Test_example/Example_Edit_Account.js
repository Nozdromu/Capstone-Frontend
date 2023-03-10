import { Card, Row, Col, Form, Button, InputGroup } from 'react-bootstrap'
import { useRef, useState, useEffect } from 'react'
import Api from '../Api'

export default function AccountEdit(prop) {
    const [data, setdata] = useState({})
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
        if (props.data) {
            setdata(props.data || '');
            setlogin(!props.login || '')
        } else {
            setlogin(false)
        }
    }, [props])

    useEffect(() => {
        if (data) {
            setuid(data.uid || '');
            setusername(data.username || '');
            setemail(data.email || '')
            setphone(data.phone || '');
            setfirstname(data.firstname || '')
            setlastname(data.lastname || '');
        }
    }, [data])
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
        data.update(props.update());
        window.location.reload();
    }
    var delete_user = () => {
        // Api.user.delete({ uid: uid }, (res) => {
        //     console.log(res);
        //     //props.updatetable();
        // })
    }


    var onchange = (event, keys) => {

        switch (keys) {
            case 'username':
                data.username = event.target.value
                setusername(data.username);
                break;
            case 'firstname':
                data.firstname = event.target.value
                setfirstname(data.firstname);
                break;
            case 'lastname':
                data.lastname = event.target.value
                setlastname(data.lastname);
                break;
            case 'email':
                data.email = event.target.value
                setemail(data.email);
                break;
            case 'phone':
                data.phone = event.target.value
                setphone(data.phone);
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
            <fieldset disabled={login}>
                <Row>
                    <Col>
                        <Button form='edit_user' type="submit" value='submit' style={{ width: '100%' }} >Edit</Button>
                    </Col>
                    <Col>
                        <Button onClick={delete_user} style={{ width: '100%' }} >Delete</Button>
                    </Col>
                </Row>
            </fieldset>
        </Card.Footer>
    </Card>)
}