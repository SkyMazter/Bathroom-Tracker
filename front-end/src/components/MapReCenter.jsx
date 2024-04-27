import { useState } from "react";
const MapReCenter = () => {
  const [address, setAddress] = useState("");
  const [newCenter, setNewCenter] = useState();

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
          setNewCenter(data);
          console.log(data);
        });
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
          className="d-flex flex-column justify-content-center px-1"
        >
          <button type="submit">Enter</button>
        </div>
      </form>
    </div>
  );
};

export default MapReCenter;
