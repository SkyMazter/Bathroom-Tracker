import { Outlet } from "react-router-dom";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { RiMapPinUserFill } from "react-icons/ri";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import mapStyle from "./style/mapStyle.js";
import MapReCenter from "./components/MapReCenter.jsx";
import { useSelector, useDispatch } from 'react-redux'
import { setLat, setLng } from "./store/slices/locationSlice.js";
import { setMap } from "./store/slices/mapSlice.js";
import userIcon from "./assets/user_icon.png"

function App() {
  const dispatch = useDispatch();
  const center = useSelector( (state) =>state.location.value)
  const markers = useSelector( (state) =>state.map.markers)
  const nycPublicMarker = useSelector( (state) =>state.map.selectedMarker)
  const showNycMarker = useSelector( (state) =>state.map.isShowingNycMarker)
  const [geoError, setGeoError] = useState(false);

  const getGeoloaction = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          dispatch(setLat(Number(pos.coords.latitude)));
          dispatch(setLng(Number(pos.coords.longitude)));
        },
        (err) => {
          setGeoError(true);
          console.log(err);
        }
      );
    } else {
      alert("Browser does not support geolocation");
    }
  };

  const divStyle = {
    width: "95vw",
    height: "500px",
  };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

  useEffect(() => {
    getGeoloaction();

    return () => {
      console.log("loaded");
    };
  }, []);

  return (
    <div style={{
      backgroundColor: '#aeccc0'
    }} className="d-flex flex-column justify-content-center align-items-center">
      <p className="display-3">Bathroom Finder</p>

      <div
        style={{
          width: "95vw",
          height: "550px",

        }}
      >
        <MapReCenter></MapReCenter>
        {isLoaded ? (
          <GoogleMap
            center={center}
            zoom={16}
            mapContainerStyle={divStyle}
            onLoad={ (map)=> {
              map.panTo(center)
              dispatch(setMap(map))
            }}
            options={{
              styles: mapStyle,
            }}
          >

            <MarkerF position={center} icon={ {
                url: userIcon,
                scaledSize: new window.google.maps.Size(50,50)
            }}
            />

            {showNycMarker ? (
              <MarkerF position={nycPublicMarker.position}></MarkerF>
            ): null }
            
            
          </GoogleMap>
        ) : (
          <p>There was an error loading the map</p>
        )}
      </div>
      
      <Outlet />
    </div>
  );
}

export default App;
