import { Outlet } from "react-router-dom";
import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
  InfoWindowF,
  DirectionsRenderer,
} from "@react-google-maps/api";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
  Image,
  ButtonGroup,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import mapStyle from "./style/mapStyle.js";
import MapReCenter from "./components/MapReCenter.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setLat, setLng } from "./store/slices/locationSlice.js";
import { setMap, setMarkers, showDbMarkers } from "./store/slices/mapSlice.js";
import userIcon from "./assets/user_icon.png";
import bathroomPin from "./assets/bathroom_pin.png";
import logo from "./assets/Logo.png";

function App() {
  const dispatch = useDispatch();

  const center = useSelector((state) => state.location.value);
  const markers = useSelector((state) => state.map.markers);
  const nycPublicMarker = useSelector((state) => state.map.selectedMarker);
  const showNycMarker = useSelector((state) => state.map.isShowingNycMarker);
  const showMarkers = useSelector((state) => state.map.isShowingDbMarkers);
  const map = useSelector((state) => state.map.map);

  const [geoError, setGeoError] = useState(false);
  const [showInfoWin, setShowInfoWin] = useState(false);
  // const [showMarkers, setShowMarkers] = useState(false);
  const [isNYCMarker, setIsNYCMarker] = useState(false);
  const [dbMarkerInfo, setDbMarkerInfo] = useState(null);
  const [winPos, setWinPos] = useState({ lat: 40.7678, lng: -73.9645 });

  const [path, setPath] = useState(false);
  const [directions, setDirections] = useState(null);

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
          notes: "This Marker was added using NYC Public Data",
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
          dispatch(showDbMarkers());
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRouteToBathroom = async (startingPoint, endingPoint) => {
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: startingPoint,
      destination: endingPoint,
      travelMode: google.maps.TravelMode.WALKING,
    });
    setDirections(results);
  };

  const divStyle = {
    width: "95vw",
    height: "625px",
  };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

  useEffect(() => {
    getGeoloaction();
    getAllBathrooms();
    return () => {
      console.log("loaded");
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#aeccc0",
      }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <Container>
        <Row>
          <Col xs={4} md={3}>
            <Image src={logo} fluid></Image>
          </Col>
          <Col
            xs={8}
            md={9}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <p className="display-3">Potty Portal</p>
          </Col>
        </Row>
      </Container>

      <div
        style={{
          width: "95vw",
          height: "675px",
        }}
      >
        
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
            {path && directions && (
              <DirectionsRenderer directions={directions}></DirectionsRenderer>
            )}
            {showInfoWin && isNYCMarker ? (
              <InfoWindowF
                position={winPos}
                onCloseClick={() => {
                  setShowInfoWin(false);
                }}
              >
                <Button
                  variant="success"
                  onClick={() => {
                    setNewBathroom();
                    alert("Saved Succesfully");
                  }}
                >
                  Save Bathroom
                </Button>
              </InfoWindowF>
            ) : null}

            {showInfoWin && !isNYCMarker ? (
              <InfoWindowF
                position={{
                  lat: dbMarkerInfo.lat + 0.001,
                  lng: dbMarkerInfo.lng,
                }}
                onCloseClick={() => {
                  setShowInfoWin(false);
                }}
              >
                <Card>
                  <Card.Body>
                    <ListGroup>
                      <ListGroup.Item>
                        <Card.Title>{dbMarkerInfo.name}</Card.Title>
                        <Card.Subtitle>{dbMarkerInfo.address}</Card.Subtitle>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Card.Text>Notes: {dbMarkerInfo.notes}</Card.Text>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </InfoWindowF>
            ) : null}

            {/*  render all markers */}
            {showMarkers &&
              markers.map((marker, index) => (
                <MarkerF
                  key={index}
                  icon={{
                    url: bathroomPin,
                    scaledSize: new window.google.maps.Size(125, 125),
                  }}
                  position={{
                    lat: marker.lat,
                    lng: marker.lng,
                  }}
                  onClick={() => {
                    map.panTo({
                      lat: marker.lat,
                      lng: marker.lng,
                    });
                    map.setZoom(20);
                    setIsNYCMarker(false);
                    setDbMarkerInfo(marker);
                    setShowInfoWin(true);
                    getRouteToBathroom(center, {
                      lat: marker.lat,
                      lng: marker.lng,
                    });
                    setPath(true);
                  }}
                />
              ))}

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
                  setIsNYCMarker(true);

                  getRouteToBathroom(center, nycPublicMarker.position);
                  setPath(true);
                }}
              ></MarkerF>
            ) : null}
          </GoogleMap>
        ) : (
          <p>There was an error loading the map</p>
        )}
        <MapReCenter></MapReCenter>
      </div>
      
      <Container>
        <Row>
          <Col
            xs={12}
            className=" my-2 d-flex flex-column justify-content-center align-items-center"
          >
            <ButtonGroup>
              <Button
                variant="light"
                onClick={() => {
                  map.panTo(center);
                  map.setZoom(16);
                }}
              >
                Recenter Map
              </Button>
              <Button
                variant="light"
                onClick={() => {
                  getGeoloaction();
                }}
              >
                Update Geolocation
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  map.panTo(center);
                  map.setZoom(16);
                  setDirections(null);
                  setPath(false);
                  setShowInfoWin(false);
                }}
              >
                Reset Map
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
      <Outlet />
    </div>
  );
}

export default App;
