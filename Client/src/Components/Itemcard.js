import Card from 'react-bootstrap/Card';
import { useState, useContext } from 'react'
import Itemdetial from './Itemdetial';
import axios from 'axios';
import S_chat from './Test_example/S_chat'
import Core from './Core';
import { itemdetial, itemshow } from '../App'

export default function Itemcard(props) {
    const [modalShow, setmodalShow] = useState(false)
    const [chatshow, setchatshow] = useState(true);
    var chat;

    var start = () => {

        axios.get('/create_room_chat', { params: { uid: props.data.uid } }).then(res => {
            props.startchat(res.data);
        })
    }


    const { item, setitem } = useContext(itemdetial)
    const { itemdetialshow, setitemdetialshow } = useContext(itemshow)

    return (
        <>
            <Card onClick={() => {
                // setmodalShow(true)
                // console.log('done')
                Core.setitem(props.data)
                console.log(props.data)
                setitem(props.data);
                setitemdetialshow(true)
            }
            }>
                <div className="rect-img-container">
                    <Card.Img className='rect-img' variant="top" src={props.data.src} />
                </div>
                <Card.Body>
                    <Card.Title className="text-over">{props.data.itemname}</Card.Title>
                    <Card.Text>
                        {'$' + props.data.price}
                    </Card.Text>
                    <Card.Text className="text-over">
                        {props.data.description}
                    </Card.Text>
                </Card.Body>
            </Card>
            {/* <Itemdetial show={modalShow} chatshow={setchatshow} startchat={start} onHide={() => setmodalShow(false)} data={props.data}></Itemdetial> */}
        </>
    )
}
