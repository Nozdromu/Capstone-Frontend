import { useState, useEffect, useContext } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Core from './Core';
import { Modal, Button, Row, Col, ListGroup } from 'react-bootstrap';
import Api from './Api';
import { itemdetial, itemshow } from '../App';
import './styles.css';

const containerStyle = {
    width: '100%',
    height: '90vh',
    
};


export default function Map() {
    const [center, setCenter] = useState({ lat: 47.5976894, lng: -122.187628 });
    const [markers, setMarkers] = useState([]);
    const [zoom, setZoom] = useState(15);
    const [show, setShow] = useState(false);
    const [currentlisting, setlisting] = useState();
    const { setitem } = useContext(itemdetial)
    const { setitemdetialshow } = useContext(itemshow)

    const handleClose = () => setShow(false);

    const handleShow = (data) => {
        setlisting(data);
        setShow(true)
    };



    useEffect(() => {
        if (currentlisting) {
            getitem(currentlisting);
        }

    }, [currentlisting])

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyA0DZnzUceQi8G8bH-4CFl4XD6jawq91Ws"
    })


    const success = position => {
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        updatemark()
        setZoom(12)
        setCenter(currentPosition);
    };


    var updatemark = () => {
        var salelist = Core.list();
        var markelocation = {};
        var markerlist = salelist.map((val) => {
            markelocation = { lat: parseFloat(val.lat), lng: parseFloat(val.lng) }
            return <Marker position={markelocation} key={val.gsid} onClick={() => { handleShow(val) }}>{val.gsid}</Marker>
        })
        markerlist.push(<Marker position={center} key={'you'}>{'you'}</Marker>)
        console.log(markerlist);
        setMarkers(current => markerlist);
    }

    var getitem = (data) => {
        Api.item.bylisting(data, (res) => { console.log(res) });
    }

    if (!isLoaded)
        navigator.geolocation.getCurrentPosition(success);



    return isLoaded ? (
        
        <div class="page-container">
        <div class="listings-container">
        <h3>Below is a list of current listings:</h3>
        
        <p></p>
        <ul class="ul">
            <li>{currentlisting ? currentlisting.title : ''}</li>
            <li>-</li>
            <li>-</li>
            <li>-</li>
            <li>-</li>
            <li>-</li>
            
        </ul>
        </div>
        <div class="map-container">
        <GoogleMap

            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
            clickableIcons={false}
            

        >
            {markers}
            <Modal show={show} onHide={handleClose} className='general-page'>
                <Modal.Header closeButton>
                    <Modal.Title>{currentlisting ? currentlisting.title : ''}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            {currentlisting ? 'Description: ' + currentlisting.description : ''}
                        </Col>

                    </Row>
                    <Row>
                        <Col>
                            {currentlisting ? 'Location: ' + currentlisting.location : ''}
                        </Col>
                    </Row>
                    <Row>
                        <Col class='items-listed'>
                        Items:
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ListGroup>
                                {currentlisting ? currentlisting.list.map(val => {
                                    return <ListGroup.Item key={val.id} onClick={() => {
                                        Core.setitem(val)
                                        setitem(val);
                                        setitemdetialshow(true)
                                    }}>{val.name} </ListGroup.Item>
                                }) : 'nothing here'}
                            </ListGroup>
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        window.open("https://www.google.com/maps/search/?api=1&query=" + currentlisting.location)
                    }}>
                        Find On Google Maps
                    </Button>
                </Modal.Footer>
            </Modal>
            <></>
        </GoogleMap>
        </div>
        </div>


    ) : <></>
}

// IGNORE:
/*{currentlisting.list.map(listing => {
    return(
        <li key={listing.id}>
            {listing.name}
        </li>
    )
})} */