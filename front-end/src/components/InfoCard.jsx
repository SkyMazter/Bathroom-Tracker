import { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedMarker, showNycMarker } from "../store/slices/mapSlice";

const InfoCard = (props) => {
  const dispatch = useDispatch();
  const map = useSelector((state) => state.map.map);
  const geocodeAddress = async (address) => {
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
          map.panTo({ lat: Number(data[0].lat), lng: Number(data[0].lon) });

          dispatch(
            setSelectedMarker({
              position: { lat: Number(data[0].lat), lng: Number(data[0].lon) },
              lable: props.name,
              directions: props.location,
            })
          );
          dispatch(showNycMarker());
        });
      } else {
        alert("Address may be incorrect or incomplete");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Row className="bg-dark-subtle m-1 rounded">
      <Col className="bg-success-subtle rounded-start">
        <p>{props.name}</p>
        <p>{props.location}</p>
      </Col>
      <Col
        xs={4}
        lg={2}
        className="border-start d-flex justify-content-center align-items-center"
      >
        <Button
          variant="success"
          onClick={() => {
            geocodeAddress(props.name);
          }}
        >
          View on Map
        </Button>
      </Col>
    </Row>
  );
};

export default InfoCard;
