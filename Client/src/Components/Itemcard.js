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


    const { item, setitem } = useContext(itemdetial);
    const { itemdetialshow, setitemdetialshow } = useContext(itemshow);
    const {searchTerm, setSearchTerm} = useState("");
    const {favorite, setFavorite} = useState([]);

    const addToFavorite = id => {
        if (!favorite.includes(id)) setFavorite(favorite.concat(id));
        console.log(id);
    };
    const removeFavorite = id => {
        let index = favorite.indexOf(id);
        console.log(index);
        let temp = [...favorite.slice(0, index), ...favorite.slice(index+1)];
        setFavorite(temp);
    };

    let findfavorite = props.filter(recipe => favorite.includes(props.data.id));

    let filtered = props.filter(recipe => {
        if (searchTerm === "") {
            return recipe;
        } else if (props.data.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return recipe;
        }
    });

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
                    <Card.Img className='rect-img' variant="top" src={props.data.item_main_photo} />
                </div>
                <Card.Body>
                    <Card.Title className="text-over">{props.data.itemname}</Card.Title>
                    <Card.Text>
                        {'Price: $' + props.data.price}
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
