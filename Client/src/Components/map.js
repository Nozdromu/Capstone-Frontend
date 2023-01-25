import { useState, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import AllData from './Data';


const containerStyle = {
    width: '80em',
    height: '70em'
};


function MyComponent() {
    var [center, setCenter] = useState({ lat: -3.745, lng: -38.523 });
    var [markers, setMarkers] = useState([]);
    var [zoom,setZoom]=useState(15);

    var fristime = true;
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyA0DZnzUceQi8G8bH-4CFl4XD6jawq91Ws"
    })

    const [map, setMap] = useState(null)
    const success = position => {
        if (fristime) {
            const currentPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            setCenter(currentPosition);
        }
        fristime = false;
    };


    var updatemark = () => {
        var salelist = AllData.list();
        var markelocation={};
        var markerlist = salelist.map((val) => {
            markelocation={ lat: parseFloat(val.lat), lng: parseFloat(val.lng) }
            return <Marker position={markelocation} key={val.gsid}>{val.gsid}</Marker>
        })
        setMarkers(markerlist);
    }

    const onLoad = useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        
        setMap(map)
        navigator.geolocation.getCurrentPosition(success);
        if (!AllData.isLoaded())
            AllData.addhook(updatemark);
        else
            updatemark()


    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])


    return isLoaded ? (

        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */}
            {markers}
            <></>
        </GoogleMap>
    ) : <></>
}

export default MyComponent;