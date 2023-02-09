import Card from 'react-bootstrap/Card';
import { useState } from 'react'
import Itemdetial from './Itemdetial';
import axios from 'axios';
import S_chat from './S_chat'


export default function Itemcard(props) {
    const [modalShow, setmodalShow] = useState(false)
    const [chatshow, setchatshow] = useState(true);
    var hidechat = () => {
        setchatshow(false);
    }

    var start = () => {
        axios.get('/create_room_chat', { params: { uid: props.data.uid } }).then(res => {
            props.startchat(<S_chat show={chatshow} setshow={hidechat} room={res.data.room} chatname={res.data.chatname} ></S_chat>)
        })
    }

    return (
        <>
            <Card onClick={() => {
                setmodalShow(true)
                console.log('done')
            }
            }>
                <div className="rect-img-container">
                    <Card.Img className='rect-img' variant="top" src={props.data.src} />
                </div>
                <Card.Body>
                    <Card.Title className="text-over">{props.data.itemname}</Card.Title>
                    <Card.Text>
                        {props.data.price}
                    </Card.Text>
                    <Card.Text className="text-over">
                        {props.data.description}
                    </Card.Text>
                </Card.Body>
            </Card>
            <Itemdetial show={modalShow} chatshow={setchatshow} startchat={start} onHide={() => setmodalShow(false)} data={props.data}></Itemdetial>
        </>
    )
}
