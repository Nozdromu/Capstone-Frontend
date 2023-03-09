import { Card, Row, Col, Form, Button, InputGroup } from 'react-bootstrap'
import { useRef, useState, useEffect } from 'react'
import Api from '../Api'
import Listing from '../../Object/listing'
import Core from './../Core';

export default function ListingEdit(prop) {
    const [createmode, setcreatemode] = useState(true)
    const [data, setdata] = useState(prop.data)
    const [listid, setlistid] = useState(0)
    const [props, setprops] = useState(prop)
    const [title, settitle] = useState('');
    const [description, setdescription] = useState('');
    const [location, setlocation] = useState('');
    const [image, setimage] = useState('');
    const [lat, setlat] = useState('');
    const [lng, setlng] = useState('')

    useEffect(() => {
        setprops(prop)
    }, [prop])

    useEffect(() => {
        if (props.data !== undefined) {
            setdata(props.data);
            setcreatemode(false)
        } else {
            setcreatemode(true)
        }
    }, [props])
    useEffect(() => {
        if (createmode) {
            setdata(new Listing({ uid: props.owner }, Core.check_dev()))
        } else {
            setdata(props.data);
        }
    }, [createmode])

    useEffect(() => {
        if (data) {
            setlistid(data.id || 0)
            settitle(data.title || '')
            setdescription(data.description || '');
            setlocation(data.location || '')
            setlat(data.lat || '');
            setlng(data.lng || '');
            setimage(data.image || '');
        }
    }, [data])

    var inputs = {
        listing_id: useRef(null),
        listing_title: useRef(null),
        listing_description: useRef(null),
        listing_location: useRef(null),
        listing_main_photo: useRef(null),
        listing_lat: useRef(null),
        listing_lng: useRef(null),
        listing_image: useRef(null)
    }
    var edit_listing = (event) => {
        event.preventDefault();
        props.data.update(props.updatetable);
    }

    var create_listing = (event) => {
        event.preventDefault();
        data.create(props.updatetable);
    }

    var startcreate = (event) => {
        event.preventDefault();
        setcreatemode(!createmode);
    }

    var delete_listing = () => {
        props.data.delete(props.updatetable)
    }

    // get lat and lng from google api
    var req_address = 'https://maps.googleapis.com/maps/api/geocode/json'
    var key = 'AIzaSyA0DZnzUceQi8G8bH-4CFl4XD6jawq91Ws'
    var get_lat_lng = () => {
        var _data = {
            address: inputs.listing_location.current.value,
            key: key
        }
        Api.map.getgeo(req_address, _data, (res) => {
            data.lat = res.data.results[0].geometry.location.lat;
            data.lng = res.data.results[0].geometry.location.lng
            setlat(data.lat);
            setlng(data.lng);
        })
    }

    var onchange = (event, keys) => {
        switch (keys) {
            case 'title':
                data.title = event.target.value
                settitle(data.title);
                break;
            case 'description':
                data.description = event.target.value
                setdescription(data.description);
                break;
            case 'location':
                data.location = event.target.value
                setlocation(data.location);
                break;
            case 'lng':
                data.lng = event.target.value
                setlng(data.lng);
                break;
            case 'lat':
                data.lat = event.target.value
                setlat(data.lat);
                break;
            case 'image':
                data.image = event.target.files
                console.log(event.target.files)
                setimage(event.target.value);
                break;
            default:
        }
    }

    return (<Card>
        <Card.Header>
            <Row>
                <Col>
                    Read/Edit/Delete listing
                </Col>
                <Col>
                    <Button size="sm" style={{ float: 'right' }} onClick={startcreate}>{createmode ? 'Cancel' : 'New'}</Button>
                </Col>
            </Row>

        </Card.Header>
        <Card.Body>
            <Form id='edit_listing' onSubmit={createmode ? create_listing : edit_listing}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="create_listing_id">
                            <Form.Label>ID</Form.Label>
                            <Form.Control onChange={(e) => onchange(e, 'id')} value={listid} required={true} ref={inputs.listing_id} type="input" disabled={true} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="create_listing_title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control onChange={(e) => onchange(e, 'title')} value={title} required={true} ref={inputs.listing_title} type="input" placeholder="Enter Title" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="create_listing_description">
                            <Form.Label>description</Form.Label>
                            <Form.Control onChange={(e) => onchange(e, 'description')} value={description} required={true} ref={inputs.listing_description} type="input" placeholder="Enter description" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="create_listing_image">
                            <Form.Label>image</Form.Label>
                            <Form.Control onChange={(e) => onchange(e, 'image')}  required={false} ref={inputs.image} type="file" placeholder="Select image" />
                        </Form.Group>
                    </Col>
                </Row>
                {/* <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="listing_main_photo">
                            <Form.Label>Main Photo</Form.Label>
                            <Form.Control required={true} ref={inputs.listing_main_photo} type="file" placeholder="Pick image" />
                        </Form.Group>
                    </Col>
                </Row> */}
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="create_listing_location">
                            <Form.Label>Location</Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control onChange={(e) => onchange(e, 'location')} value={location} required={true} ref={inputs.listing_location} type="input" placeholder="Enter Location" />
                                <Button onClick={get_lat_lng} variant="outline-secondary" id="button-addon2">
                                    Get coordinate
                                </Button>
                            </InputGroup>

                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="create_lat">
                            <Form.Label>Lat</Form.Label>
                            <Form.Control onChange={(e) => onchange(e, 'lat')} required={true} value={lat} ref={inputs.listing_lat} type="input" placeholder="lat from google" disabled />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="create_lng">
                            <Form.Label>Lng</Form.Label>
                            <Form.Control onChange={(e) => onchange(e, 'lng')} required={true} value={lng} ref={inputs.listing_lng} type="input" placeholder="lat from google" disabled />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </Card.Body>
        <Card.Footer>
            {!createmode ? <Row>
                <Col>
                    <Button form='edit_listing' type="submit" value='submit' style={{ width: '100%' }} >Edit</Button>
                </Col>
                <Col>
                    <Button onClick={delete_listing} style={{ width: '100%' }} >Delete</Button>
                </Col>
            </Row> : <Row>
                <Col>
                    <Button form='edit_listing' type="submit" value='submit' style={{ width: '100%' }} >Submit</Button>
                </Col>
            </Row>}
        </Card.Footer>
    </Card>)
}