import { Outlet } from "react-router-dom";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import "./App.css";
import { useState, useEffect } from "react";
import mapStyle from "./style/mapStyle.js";

function App() {
  const [geoError, setGeoError] = useState(false);
  const [center, setCenter] = useState({ lat: 40.7678, lng: -73.9645 }); //set this to hunter coordinates later

  const getGeoloaction = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCenter({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
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
    <div className="d-flex align-items-center">
      <h1>Bathroom Finder</h1>
      {geoError ? (
        <input placeholder="Please enter an address to begin"></input>
      ) : (
        <div>
          <p>Your current Zipcode is /*Placeholder*/, Wish to recenter?</p>{" "}
          <button>yes</button>
        </div>
      )}
      <div style={divStyle}>
        {isLoaded ? (
          <GoogleMap
            center={center}
            zoom={16}
            mapContainerStyle={divStyle}
            options={{
              styles: mapStyle,
            }}
          ></GoogleMap>
        ) : (
          <p>There was an error loading the map</p>
        )}
      </div>
      <Outlet />
    </div>
  );
}

export default App;
