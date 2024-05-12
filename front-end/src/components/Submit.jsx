import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { showDbMarkers, hideDbMarkers, setMarkers } from "../store/slices/mapSlice.js";
import { useDispatch } from "react-redux";
const Submit = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: "",
    address: "",
    notes: "",
    lat: -1,
    lng: -1,
  });

  const geocodeAddress = async () => {
    if (userData.address == "") {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3001/geo/addr/${userData.address}`,
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
          let temp = userData;
          temp.lat = Number(data[0].lat);
          temp.lng = Number(data[0].lon);
          setUserData(temp);
          setNewBathroom();
        });
      } else {
        alert(
          "Address may be incorrect or incomplete, please remove any special characters and punctiation marks"
        );
      }
    } catch (error) {
      console.log(error);
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
          name: userData.name,
          address: userData.address,
          lat: userData.lat,
          lng: userData.lng,
          notes: userData.notes,
        }),
      });
      getAllBathrooms();
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
          dispatch(showDbMarkers());
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setUserData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    dispatch(hideDbMarkers());
    geocodeAddress();
  };
  return (
    <div>
      <Container
        className="rounded my-3"
        style={{
          backgroundColor: "#306b64",
          paddingLeft: "30px",
          paddingRight: "30px",
          paddingTop: "15px",
        }}
      >
        <Row>
          <Col>
            <Link to="/">
              <Button variant="outline-light" className="mb-3">
                cancel
              </Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <h3
              style={{
                color: "white",
              }}
              className="display-6 mb-3"
            >
              Add a new bathroom!
            </h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form>
              <InputGroup className="mb-3">
                <InputGroup.Text>Name</InputGroup.Text>
                <Form.Control
                  placeholder="Name of the Location"
                  name="name"
                  value={userData.name}
                  onChange={handleOnChange}
                ></Form.Control>
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text>Address</InputGroup.Text>
                <Form.Control
                  placeholder="Address of the Location"
                  name="address"
                  value={userData.address}
                  onChange={handleOnChange}
                ></Form.Control>
              </InputGroup>
              <Form.Group className="mb-3">
                <Form.Label
                  style={{
                    color: "white",
                  }}
                >
                  Notes:
                </Form.Label>
                <Form.Control
                  name="notes"
                  onChange={handleOnChange}
                  value={userData.notes}
                  className=""
                  as="textarea"
                  rows={6}
                  placeholder="Describe any rules to access these facilities. Such as making a purchase or hours of operation."
                />
              </Form.Group>
              <Button
                type="submit"
                variant="light"
                onClick={handleOnSubmit}
                className="mb-3"
              >
                Submit form
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Submit;
