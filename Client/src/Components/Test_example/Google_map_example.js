import { useState, useCallback, useRef, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from '@react-google-maps/api';
import Core from '../Core';
import { Container, Overlay, Popover, Modal, Button, Row, Col, ListGroup } from 'react-bootstrap';
import Api from './../Api';


const containerStyle = {
    width: '100%',
    height: '90vh'
};


export default function Map() {
    const [center, setCenter] = useState({ lat: 47.5976894, lng: -122.187628 });
    const [markers, setMarkers] = useState([]);
    const [zoom, setZoom] = useState(15);
    const [show, setShow] = useState(false);
    const [currentlisting, setlisting] = useState();

    const handleClose = () => setShow(false);

    const [target, setTarget] = useState(null);
    const ref = useRef(null);
    const [map, setMap] = useState(null)
    // const handleClick = (event) => {
    //     console.log(show)
    //     setShow(!show);
    //     setTarget(event.target);
    // };
    const handleShow = (data) => {
        setlisting(data);
    };



    useEffect(() => {
        if (currentlisting) {
            getitem(currentlisting);
            setShow(true)
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
        setMarkers(markerlist);
    }

    var getitem = (data) => {
        Api.item.bylisting(data,(res) => { console.log(res) });
    }



    const onLoad = useCallback(function callback(map) {
        setMap(map)
    }, [])

    useEffect(() => {
        if (map)
            navigator.geolocation.getCurrentPosition(success);
        updatemark()
    }, [map])

    useEffect(() => {
        setZoom(12)
    }, [center])



    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])


    return isLoaded ? (
        <Container ref={ref} style={{ width: '100%', height: '100%' }}>
            <GoogleMap

                mapContainerStyle={containerStyle}
                center={center}
                zoom={zoom}
                clickableIcons={false}
                onLoad={onLoad}
                onUnmount={onUnmount}

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
                            <ListGroup>
                                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                            </ListGroup>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => {
                            window.open("https://www.google.com/maps/search/?api=1&query=" + currentlisting.location)
                        }}>
                            go google map
                        </Button>
                    </Modal.Footer>
                </Modal>
                <></>
            </GoogleMap>

        </ Container>

    ) : <></>
}

