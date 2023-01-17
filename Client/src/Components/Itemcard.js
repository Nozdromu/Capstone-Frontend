import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { Component } from 'react'
import { render } from '@testing-library/react';
import Itemdetial from './Itemdetial';


class Itemcard extends Component {

    constructor() {
        super();
        this.state={
            modalShow:false,
        }
    }

    render() {
        return (
            <>
                <Card style={{ width: '18rem' }} onClick={() => this.setState({modalShow:true})}>
                    <div className="rect-img-container">
                        <Card.Img className='rect-img' variant="top" src={this.props.data.src} />
                    </div>

                    <Card.Body>
                        <Card.Title className="text-over">{this.props.data.itemname}</Card.Title>
                        <Card.Text>
                            {this.props.data.price}
                        </Card.Text>
                        <Card.Text className="text-over">
                            {this.props.data.description}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Itemdetial show={this.state.modalShow} onHide={() => this.setState({modalShow:false})} data={this.props.data}></Itemdetial>
            </>

        )
    }



}


export default Itemcard;