import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { Component } from 'react'
import { render } from '@testing-library/react';


class Itemcard extends Component {


    render() {
        return (
            <Card style={{ width: '18rem' }}>
                <div className="rect-img-container">
                    <Card.Img className='rect-img' variant="top" src={this.props.data.src} />
                </div>
            
            <Card.Body>
                <Card.Title className="text-over">{this.props.data.description}</Card.Title>
                <Card.Text>
                    {this.props.data.price}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
        )
    }



}


export default Itemcard;