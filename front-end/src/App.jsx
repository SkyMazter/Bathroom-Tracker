import { Outlet } from "react-router-dom";
import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
  InfoWindowF,
} from "@react-google-maps/api";
import { RiMapPinUserFill } from "react-icons/ri";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import mapStyle from "./style/mapStyle.js";
import MapReCenter from "./components/MapReCenter.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setLat, setLng } from "./store/slices/locationSlice.js";
import { setMap, setMarkers } from "./store/slices/mapSlice.js";
import userIcon from "./assets/user_icon.png";

function App() {
  const dispatch = useDispatch();

  const center = useSelector((state) => state.location.value);
  const markers = useSelector((state) => state.map.markers);
  const nycPublicMarker = useSelector((state) => state.map.selectedMarker);
  const showNycMarker = useSelector((state) => state.map.isShowingNycMarker);

  const [geoError, setGeoError] = useState(false);
  const [showInfoWin, setShowInfoWin] = useState(false);
  const [winPos, setWinPos] = useState({ lat: 40.7678, lng: -73.9645 });

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

  const setNewBathroom = async () => {
    try {
      await fetch("http://localhost:3001/bathrooms/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nycPublicMarker.lable,
          address: nycPublicMarker.directions,
          lat: nycPublicMarker.position.lat,
          lng: nycPublicMarker.position.lng,
          notes: "something",
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBathrooms = async () => {
    try {
      const response = await fetch("http://localhost:3001/bathrooms/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const res = response.json();
        res.then((data) => {
          dispatch(setMarkers(data));
        });
      }
    } catch (error) {
      console.log(error);
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
    getAllBathrooms();
    return () => {
      console.log("loaded");
      console.log(markers);
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#aeccc0",
      }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
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
            onLoad={(map) => {
              map.panTo(center);
              dispatch(setMap(map));
            }}
            options={{
              styles: mapStyle,
            }}
          >
            {showInfoWin ? (
              <InfoWindowF
                position={winPos}
                onCloseClick={() => {
                  setShowInfoWin(false);
                }}
              >
                <Button
                  variant="success"
                  onClick={() => {
                    // console.log(markers);
                    setNewBathroom();
                  }}
                >
                  Save Bathroom
                </Button>
              </InfoWindowF>
            ) : null}

            {/*  render all markers */}


            <MarkerF
              position={center}
              icon={{
                url: userIcon,
                scaledSize: new window.google.maps.Size(50, 50),
              }}
            />

            {showNycMarker ? (
              <MarkerF
                position={nycPublicMarker.position}
                onClick={() => {
                  setWinPos(nycPublicMarker.position);
                  setShowInfoWin(true);
                  console.log(showInfoWin);
                }}
              ></MarkerF>
            ) : null}
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
