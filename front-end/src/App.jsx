import { Outlet } from "react-router-dom";
import { GoogleMap, MarkerF, useJsApiLoader} from "@react-google-maps/api";
import "./App.css";
import { useState, useEffect } from "react";

ymrtswtjrsjtrsbfzxfsngfs
function App() {

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
          console.log(err);
        }
      );
    } else {
      alert("Browser does not support geolocation");
    }
  };

  const mapStyle = {
    width: "80vh",
    height: "400px",
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
    <div>
      <h1>Bathroom Finder</h1>
      <div style={mapStyle}>
        {isLoaded ? (
          <GoogleMap center={center} zoom={16} mapContainerStyle={{width: '100%', height: '100%'}}>
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