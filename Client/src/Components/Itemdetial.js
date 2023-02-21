import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col, Image, Carousel } from 'react-bootstrap';
import Core from './Core';



export default function Itemdetial(props) {

    return (

        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.show}
            autoFocus={false}
            enforceFocus={false}
        >
            <Modal.Header closeButton>
                <h4>{props.data.itid+':'+props.data.uid}</h4>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <Carousel>
                                {props.data.list.map((val, index) => {
                                    return (
                                        <Carousel.Item key={index + val.itid}>
                                            <Image className="d-block w-100" src={val.src}></Image>
                                        </Carousel.Item>
                                    )
                                })}
                            </Carousel>
                        </Modal.Title>
                    </Col>
                    <Col>
                        <h4>{props.data.itemname}</h4>
                        <p>
                            {props.data.description}
                        </p>
                    </Col>
                </Row>

            </Modal.Body>
            <Modal.Footer>
                {Core.getUser()._islogin()?<Button onClick={props.startchat}>chat</Button>:<></>}
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>

    )
}


