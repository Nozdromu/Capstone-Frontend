import { React, Component, useState, useEffect, useContext } from "react";
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from "@react-google-maps/api";
import Core from "./Core";
import Api from "./Api";
import { itemdetial, itemshow } from '../App';
import { Modal, Button, Row, Col, ListGroup } from 'react-bootstrap';



const containerStyle = {
    width: '100%',
    height: '90vh'
};

export default function UpdatedMap() {
    const [center, setCenter] = useState({ lat: 47.5976894, lng: -122.187628 });
    const [markers, setMarkers] = useState([]);
    const [listings, setListings] = useState([]);
    const [zoom, setZoom] = useState(15);
    const [show, setShow] = useState(false);
    const [currentlisting, setlisting] = useState();
    const { setitem } = useContext(itemdetial);
    const { setitemdetialshow } = useContext(itemshow);

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
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyA0DZnzUceQi8G8bH-4CFl4XD6jawq91Ws"
    })

    var getitem = (data) => {
        Api.item.bylisting(data, (res) => { console.log(res) });
    }
    const success = position => {
        const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        updatemark()
        setZoom(15)
        setCenter(currentPosition);
    };

    

    if (!isLoaded)
        navigator.geolocation.getCurrentPosition(success);

    var updateitems = () => {
        var itemlist = Core.item();
        var listing = {};
        var itemslisted = itemlist.map((val)=> {
            listing = {}
            return (
                <p>{val.name}</p>
            )
        })
    }

    var updatemark = () => {
        var saleslist = Core.list();
        
        var markerlocation = {};
        //const listings = new Array;
        var markerlist = saleslist.map((val) => {
            markerlocation = { lat: parseFloat(val.lat), lng: parseFloat(val.lng) }
            
            return (
                <Marker
                    position={markerlocation}
                    key={val.gsid}
                    onClick={() => {
                        handleShow(val)
                    }}
                >
                    {val.gsid}
                </Marker>
            )
        })
        markerlist.push(<Marker position={center} key={'Current Position'}>{'Current Location'}</Marker>)
        console.log(markerlist);
        setMarkers(current => markerlist);
        //setListings(current => markerList);
    }
    return isLoaded ? (

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

    ) : <></>

}