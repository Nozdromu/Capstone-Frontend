import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col, Image, Carousel } from 'react-bootstrap';
import Core from './Core';
import './styles/nav-bar.css';


export default function Itemdetial(props) {

    const showInMapClicked = () => {
        window.open("https://maps.google.com?q="+props.data.lat+","+props.data.lng);
    };
    
    return (

        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.show}
            autoFocus={false}
            enforceFocus={false}
            className='whole'
        >
            <Modal.Header>
                <h4>{'Item id:' + props.data.id + '(to be described listing id)'}</h4>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    {/*
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
                            */}
                    <Col>
                    <Image src={props.data.src} thumbnail/>
                    </Col>
                    <Col>
                        <h4>{props.data.itemname}</h4>
                        <p className='card-price'>
                            {'$'+props.data.price}
                        </p>
                        <p className='card-text'>
                            {'Quantity: ' + props.data.quantity}
                        </p>
                        <p className='card-text'>
                            {props.data.description}
                        </p>
                        
                        <p className='card-text'>
                            {'lat: ' + props.data.lat + ', lng: ' + props.data.lng}
                        </p>

                    </Col>
                </Row>

            </Modal.Body>
            <Modal.Footer>
                <div className='modal-footer'>
                {/*{Core.check_dev()&&Core.getUser().islogin?<Button onClick={props.startchat}>chat</Button>:<></>}*/}
                <Button onClick={showInMapClicked}>Directions</Button>  {/* TODO: set button to open google map with directions -----> done: button opens google maps to coordinates*/}
                                                                        {/* TODO: set button to open map to listing address, not coordinates */}
                <Button onClick={props.onHide}>Close</Button>
                </div>
            </Modal.Footer>
        </Modal>

    )
}


