import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Core from './Core';
import Api from './Api';

function Signup(props) {

  const [show, setshow] = useState(false)
  var formdata = {
    username: '',
    password: '',
    re_password: ''
  }
  var User = Core.getUser();

  const handlelogin = () => {
    // var account = {
    //   email: emailInput.current.value,
    //   password: psdInput.current.value
    // }
    User.login(formdata.username, formdata.password, res => {
      console.log(res);
      if (Core.check_dev()) {
        if (res.data.result) {
          sign_in_success()
        } else {
          sign_in_error()
        }
      } else {
        if (res.data.status === 'success') {
          sign_in_success()
        } else {
          sign_in_error()
        }
      }

    })
  }
  const reg_callback=(req)=>{
    console.log(req);
  }
  const reg=()=>{
    Api.user.register(formdata,reg_callback)
  }
  


  var onchange = (e, key) => {
    switch (key) {
      case 'password':
        formdata.password = e.target.value;
        break;
      case 're_password':
        formdata.re_password = e.target.value;
        break;
      case 'username':
        formdata.username = e.target.value;
        break;
      default:
        break;
    }

  }
  var sign_in_success = (user_data) => {
    props.signin();
    props.onHide();
  }
  var sign_in_error = (error_data) => {

  }

  var switchToReg = () => {
    setshow(!show)
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
          <Modal.Title>{show?'Register':'Login'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form action='/signup'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address/username</Form.Label>
              <Form.Control onChange={(e) => onchange(e, 'username')} type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" onChange={(e) => onchange(e, 'password')} placeholder="Password" />
            </Form.Group>
            {show ? <Form.Group className="mb-3" controlId="formBasicPassword_re">
              <Form.Label>RE_Password</Form.Label>
              <Form.Control type="password" onChange={(e) => onchange(e, 're_password')} placeholder="Password" />
            </Form.Group> : <></>}


          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="primary" onClick={handlesignup}>
            Regist now
          </Button> */}
          <Button variant="primary" onClick={show?reg:handlelogin}>
            Submit
          </Button>
          <Button variant="primary" onClick={switchToReg}>
            {show?'cancel':'register'}
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