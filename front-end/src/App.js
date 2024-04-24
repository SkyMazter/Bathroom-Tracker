import { Outlet } from "react-router-dom";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import "./App.css";
import { useState } from "react";

function App() {
  const [center, setCenter] = useState(null); //set this to hunter coordinates later
  const mapStyle = {
    width: '80vh',
    height: '400px'
  }
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "YOUR_API_KEY"
  })
  return (
    <div>
      <h1>Hello World</h1>
      <Outlet />
    </div>
  );
}

export default App;
