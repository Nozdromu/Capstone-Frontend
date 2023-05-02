import Card from 'react-bootstrap/Card';
import { useState } from 'react'
import Itemdetial from './Itemdetial';
import axios from 'axios';
import S_chat from './Test_example/S_chat'
import './styles/nav-bar.css';
import { Image } from 'react-bootstrap';

export default function Itemcard(props) {
    const [modalShow, setmodalShow] = useState(false)
    const [chatshow, setchatshow] = useState(true);
    var chat;

    var start = () => {

        axios.get('/create_room_chat', { params: { uid: props.data.uid } }).then(res => {
            props.startchat(res.data);
        })
    }

    return (
        <div className='main-title'>
            <Card onClick={() => {
                setmodalShow(true)
                console.log('done')
            }
            }>
                <div className="rect-img-container">
                    <Card.Img as={Image} className='rect-img' variant="top" src={props.data.src} />
                </div>
                <Card.Body>
                    <Card.Title className='text-over card-title'>{props.data.itemname}</Card.Title>
                    <Card.Text className='card-price'>{'$' + props.data.price}</Card.Text>
                    {/*<Card.Text className='card-price'>{'$' + props.data.src}</Card.Text>         --jsut checking that source is correct*/}
                    <Card.Text className="text-over card-text">{props.data.description}</Card.Text>
                </Card.Body>
            </Card>
            <Itemdetial show={modalShow} chatshow={setchatshow} startchat={start} onHide={() => setmodalShow(false)} data={props.data}></Itemdetial>
        </div>
    )
}
