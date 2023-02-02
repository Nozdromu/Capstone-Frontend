import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col, Image, Carousel } from 'react-bootstrap';



class Itemdetial extends Component {
    _isMounted = false;
    constructor() {
        super();
        // this.state = { imagelist: [] }
    }

    render() {

        return (

            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                <h4>{this.props.data.itid}</h4>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Modal.Title id="contained-modal-title-vcenter">
                                <Carousel>
                                    {this.props.data.list.map((val,index) => {
                                        return (
                                            <Carousel.Item key={index+val.itid}>
                                                <Image className="d-block w-100" src={val.src}></Image>
                                            </Carousel.Item>
                                        )
                                    })}
                                </Carousel>
                            </Modal.Title>
                        </Col>
                        <Col>
                            <h4>{this.props.data.itemname}</h4>
                            <p>
                                {this.props.data.description}
                            </p>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>

        )
    }
}

export default Itemdetial;