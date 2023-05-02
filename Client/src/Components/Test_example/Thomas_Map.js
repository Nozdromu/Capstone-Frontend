import {React, useState, useCallback} from "react";
import { ReactDOM } from "react";
import Core from "../Core";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { GoogleMapProps } from "@react-google-maps/api";
import { useRef } from "react";
import { Container } from "react-bootstrap";


{/*const windowSize = useRef([window.innerWidth, window.innerHeight]);*/}

const containerStyle = {
    width: '80em',
    height: '37em'
};

const center = {
    lat: 47.6509549,
    lng: -122.1458342
};



function MarkedMap (){
    var [center, setCenter] = useState({
        lat: 47.6509549,
        lng: -122.1458342
    });
    var [markers, setMarkers] = useState([]);
    var [zoom, setZoom] = useState(15);
    
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey:"AIzaSyCYXV9CyepKeyRmluagytd-8y5pd3pT04k"
    })

    const [map, setMap] = useState(null)

    const onLoad = useCallback(function callback(map){
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])


    
    return isLoaded ?(
        <Container>
            <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {/*children*/}
            <></>
            </GoogleMap>
        </Container>
    ): <></>
};

export default React.memo(MarkedMap)

{/*

let map, infoWindow;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: 47, lng: 122},
        zoom: 6,
    });
    infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement("button");

    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(locationButton);
    locationButton.addEventListener("click", () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    infoWindow.setPosition(pos);
                    infoWindow.setContent("You've been found, bozo");
                    infoWindow.open(map);
                    map.setCenter(pos);
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        } else {
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos){
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation ? "Error: The Geolocation service failed." : "Error: your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}

*/}

