import React, {useEffect, useState} from "react";
import {
  Accordion,
  Button,
  Col,
  Container,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Core from "./Core"
import User from "../Object/user";
import Api from "./Api";

// Because bootstrap inputs are super verbose, extracted the repetitive portions into custom components
function TextField({ value, onChange, required = false, placeholder, ...rest }) {
  return (
    <Form.Control
      onChange={(e) => onChange(e.target.value)}
      required={required}
      value={value}
      type="input"
      placeholder={placeholder}
      {...rest}
    />
  );
}
function LabelledTextField({ label, ...rest }) {
  return (
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Row className="d-flex justify-content-between">
        <Col>
          <Form.Label>{label}</Form.Label>
        </Col>
      </Row>
      <TextField {...rest} />
    </Form.Group>
  );
}

// Then, since the whole form is kind of one unit (operates on a user), extracted that into a component as well
// You can kind of think of it as an input field, just that it takes more complex data (an entire user) instead of just a string or number
function UserForm({user, setUser}) {
  const onChange = (key) => (e) => {
    console.log(key);
    setUser(current => ({...current, [key]: e}))//e.target.value creasheD?
  }
  return (
    <>
      <LabelledTextField
        label="First name"
        onChange={onChange('firstname')}
        value={user.firstname}
        required
        placeholder="Enter First Name"
      />
      <LabelledTextField
        label="Last name"
        value={user.lastname}
        onChange={onChange('lastname')}
        required
        placeholder="Enter Last Name"
      />
      <LabelledTextField
        label="Email"
        value={user.email}
        onChange={onChange('email')}
        required
        placeholder="Enter Email"
      />
      <LabelledTextField
        label="Address Line 1"
        value={user.address1}
        onChange={onChange('address1')}
        required
        placeholder="Address line 1"
      />
      <LabelledTextField
        label="Address line 2"
        value={user.address2}
        onChange={onChange('address2')}
        required
        placeholder="Address line 2"
      />

      <Form.Group
        className="mb-3"
        controlId="exampleForm.ControlInput1"
      >
        <Row className="d-flex justify-content-between">
          <Form.Label>City</Form.Label>
          <TextField placeholder="City" value={user.city} onChange={onChange('city')}/>

          <Form.Label>State</Form.Label>
          <TextField placeholder="State" value={user.state} onChange={onChange('state')}/>

          <Form.Label>Zip</Form.Label>
          <TextField placeholder="Zip Code" value={user.zip} onChange={onChange('zip')}/>
        </Row>
      </Form.Group>

      <LabelledTextField
        label="Phone number"
        value={user.phone}
        onChange={onChange('Phone')}
        required
        placeholder="City"
      />
    </>
  )
}

// assume that the only prop passed in to the page is the user ID
function Accountpage(prop) {

  const [savedUser, setSavedUser] = useState(null); // User data fetched from / saved to the server (updates only when saved)
  const [user, setUser] = useState(null); // Current user data in the frontend application (updates in real time, controls input fields)

  const [load, setLoad] = useState(false)
  var set = () => {
    setLoad(true);
  }
  
  useEffect(() => {
    Core.addhook(set);
    // So I will use that ID to fetch the rest of the user data
    //     New react has a 'use' hook and suspense, but I'm not familiar with that tech yet

    var temp = Core.getUser();
      //setSavedUser(temp);
      setUser(temp);
    
},[])

  const saveUser = () => {
    setSavedUser(user);
    new User(user).update();
  }

  const list = [];


  return load ? (
    <>
      <Container>
        <Row className="align-items-center justify-content-center">
          <Card style={{ width: "50em" }}>
            <Card.Header>
              <div className="rect-img-container">
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
                  {/* Here we can nearly use the entire form just as if it was a basic input field */}
                  <UserForm user={user} setUser={setUser} />
                  <Button onClick={saveUser} disabled={user === savedUser}>Save</Button>
                  <Button onClick={Core.getUser.logout}>log out</Button>
                </Tab>

                
                <Tab eventKey="list" title="List">
                  <Row className="gy-2">
                    <Col className="col-12">
                      <Accordion>{list}</Accordion>
                    </Col>
                    <Col className="col-12">
                      <Button style={{ width: "100%" }}>Add new listing</Button>
                    </Col>
                  </Row>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  ) : (<></>);
}

export default Accountpage;
