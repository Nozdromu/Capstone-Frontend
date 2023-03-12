// Map function shows random places and gives directions to a marker clicked from map center (user location)

import React from "react";
import { useState, useMemo, useCallback, useRef } from "react";
import { GoogleMap, Marker,InfoWindow, DirectionsRenderer, Circle, MarkerClusterer } from "@react-google-maps/api";
//import Places from "./Places";
//import Distance from "./Distance";
import { addressData } from "./trialData";
const google = window.google;


/*
var LatLngLiteral = google.maps.LatLngLiteral;
var DirectionsResult = google.maps.DirectionsResult;
var MapOptions = google.maps.MapOptions;
*/


export default function Map(){
    //const [office, setOffice] = useState();
    const [directions, setDirections] = useState();
    const mapRef = useRef();
    const center = useMemo(() => ({
        lat: 47.797932,
        lng: -122.096008
    }),
    []);
    const options = useMemo(() =>({
        //mapId: "95ce05a31ef920c8",
        disableDefaultUI: true,
        clickableIcons: false,
    }),
    []);
    const onLoad = useCallback((map) => (mapRef.current = map), []);
    const houses = useMemo(() => generateHouses(center), [center]);

    const fetchDirections = house => {
        if (!center) return;

        const service = new google.maps.DirectionsService();
        service.route({
            origin: center,
            destination: house,
            travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
            if(status === "OK" && result){
                setDirections(result);
            }
        });
    };

    const Display = ({name, address}) => {
        if(!name) return <div/>;
        return (
            <table>
                <tbody>
                    <tr>
                        <td>
                            <h6>
                                {name}
                            </h6>
                        </td>
                        <td>
                            <h6>
                                {address}
                            </h6>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    };

    // Draws markers using info from json file
    /*drawMarker = () => {
        return (
          addressData.map((trialData, key) => {
            return (
              <Marker
                key={key}
                id={key}
                title={trialData.name}
                name={trialData.name}
                position={{
                  lat: trialData.lat,
                  lng: trialData.lng
                }}
                onClick={this.onMarkerClick}
                >
                  <InfoWindow
                  marker={this.state.activeMarker}
                  visible={this.state.showingInfoWindow}
                  onClose={this.onClose}
                >
                  <div>
                    <h4>
                      {this.state.selectedPlace.name}
                    </h4>
                  </div>
                </InfoWindow>
                </Marker>
            )
          })
        )
      }*/
    
    return(
        <div className="container01">
            <div className="controls">
                <h2>Available Events</h2>
                {addressData.map((trialData, key) => {
                    return (
                        <div key={key}>
                            <Display
                                key={key}
                                name={trialData.name}
                                address={trialData.address}
                            />
                        </div>
                    );
                })}
            </div>
            <div className="map">
                <GoogleMap
                    zoom={15}
                    center={center}
                    mapContainerClassName="map-container"
                    options={options}
                    onLoad={onLoad}
                >
                    <Marker
                        position={center}
                    />
                    {<DirectionsRenderer 
                        directions={directions} 
                        options={{
                            zIndex:50
                        }}
                    />}
                    
                    
                    
                    
                    {houses.map((house) => (
                        <Marker 
                        key={house.lat} 
                        position={house}
                        onClick={() => {
                            fetchDirections(house);
                        }} 
                        />))}

                    
                    
                    
                </GoogleMap>
            </div>
        </div>
    );
}


/*
{addressData.map((trialData) => {
    <Marker
        key={trialData.name}
        name={trialData.name}
        address={trialData.address}
        onClick={() => {
            fetchDirections(trialData);
        }}
    />
})}
                    */



/* Possible distance circle */
const defaultOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true
  }
  const closeOptions = {
    ...defaultOptions,
    zIndex: 3,
    fillOpacity: 0.05,
    strokeColor: "#8BC34A",
    fillColor: "#8BC34A"
  }
  const middleOptions = {
    ...defaultOptions,
    zIndex: 2,
    fillOpacity: 0.05,
    strokeColor: "#FBC02D",
    fillColor: "#FBC02D"
  }
  const farOptions = {
    ...defaultOptions,
    zIndex: 1,
    fillOpacity: 0.05,
    strokeColor: "#FF5252",
    fillColor: "#FF5252"
  }
  

//
const generateHouses = position => {
    const _houses = []
    for (let i = 0; i < 100; i++) {
      const direction = Math.random() < 0.5 ? -2 : 2
      _houses.push({
        lat: position.lat + Math.random() / direction,
        lng: position.lng + Math.random() / direction
      })
    }
    return _houses
  }