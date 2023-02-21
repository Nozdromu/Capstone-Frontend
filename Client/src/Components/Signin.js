import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Core from './Core';
import Api from './Api'

function Signup(props) {
  const emailInput = useRef(null);
  const psdInput = useRef(null);
  const _email = (<Form.Control ref={emailInput} type="email" placeholder="Enter email" />);
  const _psd = (<Form.Control ref={psdInput} type="password" placeholder="Password" />);
  var User = Core.getUser();
  // const handlesignup = () => {
  //   var account = {
  //     email: emailInput.current.value,
  //     password: psdInput.current.value
  //   }
  //   console.log(User._getuser());
  //   // console.log(account);

  //   // axios.get('/signup', { params: account, withCredentials: true }).then(res => {
  //   //   console.log(res);
  //   //   console.log(sessionStorage);
  //   // })
  // }

  const handlelogin = () => {
    var account = {
      email: emailInput.current.value,
      password: psdInput.current.value
    }
    Api.user.sign_in(account, res => {
      console.log(res.data);
      if (res.data.result) {
        sign_in_success(res.data)
      } else {
        sign_in_error()
      }
    })
  }

  var sign_in_success = (user_data) => {
    User._login(user_data.user);
    props.signin();
    props.onHide();
  }
  var sign_in_error = (error_data) => {

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
          <Modal.Title>Login</Modal.Title>
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

          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="primary" onClick={handlesignup}>
            Regist now
          </Button> */}
          <Button variant="primary" onClick={handlelogin}>
            Submit
          </Button>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Signup;