import { useState, useEffect, useContext } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Core from './Core';
import { Modal, Button, Row, Col, ListGroup } from 'react-bootstrap';
import Api from './Api';
import { itemdetial, itemshow } from '../App';
import Listing from '../Object/listing';



const containerStyle = {
    width: '100%',
    height: '90vh'
};


export default function Map() {
    const [center, setCenter] = useState({ lat: 47.5976894, lng: -122.187628 });
    const [markers, setMarkers] = useState([]);
    const [listings, setListings] = useState([]);
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
        updatemark();
        setZoom(20);
        setCenter(currentPosition);
    };


    var updatemark = () => {
        var salelist = Core.list();
        var itemlist = Core.item();
        var markelocation = {};
        var listings = {};
        var markerlist = salelist.map((val) => {
            markelocation = { lat: parseFloat(val.lat), lng: parseFloat(val.lng) }
            listings = { name: val.name }
            ////console.log(markelocation)
            //console.log(listings)
            return <Marker position={markelocation} key={val.gsid} onClick={() => { handleShow(val) }}>{val.gsid}</Marker>
        })
        var listinglist = itemlist.map((val) => {
            listings = { name: val.name }
            console.log(listings)
            return <p>{listings}</p>
        })
        markerlist.push(<Marker position={center} key={'you'}>{'you'}</Marker>)
        
        ////console.log(markerlist);
        ////console.log(listings);
        setMarkers(current => markerlist);
        setListings(current => listinglist);
    }
    /*var listedlistings = () => {
        var listings = Core.list();
        var listingname = {};
        var listedlist = listings.map((val) => {
            listingname = {lat: parseFloat(val.gsid), lng: parseFloat(val.lng)}
            
        })
        console.log(listingname);
    }*/

    var getitem = (data) => {
        Api.item.bylisting(data, (res) => { console.log(res) });
    }

    if (!isLoaded)
        navigator.geolocation.getCurrentPosition(success);



    return isLoaded ? (
        <div>
            
            <Row>
                <Col style={{ width: 50 }}>
                <h1>{listings}</h1>
                </Col>

                <Col>
                    <GoogleMap

                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={zoom}
                        clickableIcons={false}

                    >
                        {markers}

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>{currentlisting ? currentlisting.title : ''}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Row>
                                    <Col>
                                        {currentlisting ? currentlisting.description : ''}
                                    </Col>

                                </Row>
                                <Row>
                                    <Col>
                                        {currentlisting ? currentlisting.location : ''}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <ListGroup>
                                            {currentlisting ? currentlisting.list.map(val => {
                                                return <ListGroup.Item
                                                    key={val.id} onClick={() => {
                                                        Core.setitem(val);
                                                        setitem(val);
                                                        setitemdetialshow(true);
                                                    }}>{val.name}</ListGroup.Item>
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
                                    Get Directions
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <></>
                    </GoogleMap>
                </Col></Row>
        </div>


    ) : <></>
}

