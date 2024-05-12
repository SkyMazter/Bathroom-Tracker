import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLat, setLng } from "../store/slices/locationSlice.js";

const MapReCenter = () => {
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const map = useSelector((state) => state.map.map);
  
  const geocodeAddress = async () => {
    if (address == "") {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3001/geo/addr/${address}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const res = response.json();
        res.then((data) => {
          if (data.length == 0) {
            alert("Address may be incorrect or incomplete");
            return;
          }

          dispatch(setLat(Number(data[0].lat)));
          dispatch(setLng(Number(data[0].lon)));
          map.panTo({ lat: Number(data[0].lat), lng: Number(data[0].lon) });
        });
      } else {
        alert("Address may be incorrect or incomplete");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    geocodeAddress();
  };

  return (
    <div className=" w-100 d-flex">
      <form onSubmit={handleOnSubmit} className=" w-100 d-flex">
        <input
          style={{
            width: "80%",
          }}
          type="text"
          value={address}
          onChange={(event) => {
            setAddress(event.target.value);
          }}
          placeholder="Please enter an address to change map view"
        ></input>
        <div
          style={{
            width: "20%",
          }}
          className="d-flex flex-column justify-content-end"
        >
          <button type="submit">Enter</button>
        </div>
      </form>
    </div>
  );
};

export default MapReCenter;
