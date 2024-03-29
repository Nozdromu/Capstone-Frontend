import { Card, Row, Col, Form, Button } from 'react-bootstrap'
import { useRef, useState, useEffect } from 'react'
import Core from './../Core';

export default function Signin(props) {
    const [disabled, setdisabled] = useState(!props.login)
    const [user] = useState(Core.getUser())
    const [status, setstatus] = useState('')

    useEffect(() => {
        setdisabled(!props.login)
    }, [props])
    var inputs = {
        username: useRef(null),
        password: useRef(null)
    }

    var _login = (event) => {
        event.preventDefault();
        var data = {
            email: inputs.username.current.value,
            password: inputs.password.current.value
        }
        user.login(data.email, data.password, (res) => {
            console.log(res);
            if (Core.check_dev()) {
                if (res.data.result) {
                    props.changeuser(res.data.user);
                }
            } else {
                if (res.data.status === 'success') {
                    props.changeuser(Core.getUser());
                } else {

                }
                setstatus(res.data.status + '  :  ' + res.data.message)
            }
        })
    }

    var _signout = () => {
        user.logout(res => {
            props.logout()
            console.log(res)
            setstatus(res.data.status + '  :  ' + res.data.message)
        })
    }

    return (<Card>
        <Card.Header>
            User login
        </Card.Header>
        <Card.Body>
            <Row>
                <Form id='login_form' onSubmit={_login}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="login_username">
                                <Form.Label>User name</Form.Label>
                                <Form.Control ref={inputs.username} disabled={!disabled} type="input" placeholder="Enter username" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="login_password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control disabled={!disabled} ref={inputs.password} type="password" placeholder="Enter password" />
                            </Form.Group>
                        </Col>

                    </Row>
                    <Row>
                        <Col>
                            {status}
                        </Col>
                    </Row>
                </Form>
            </Row>
            <Row>
            </Row>
        </Card.Body>
        <Card.Footer>
            <Row>
                <Col>
                    <Button disabled={!disabled} style={{ width: '100%' }} type="submit" form='login_form'>login</Button>

                </Col>
                <Col>
                    <Button disabled={disabled} style={{ width: '100%' }} onClick={_signout}>logout</Button>
                </Col>
            </Row>


        </Card.Footer>
    </Card>)
}