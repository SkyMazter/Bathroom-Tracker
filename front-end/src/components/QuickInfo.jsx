import { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import InfoCard from "./InfoCard.jsx";
import "../style/QuickInfo.css";
import { Link } from "react-router-dom";

const QuickInfo = () => {
  //PLans for this component
  /*
    Call the list of NYC Open BAthrooms
    PArse through data and find closet ones based on strings
    Print an array of the top five closest, 
    implement a buttonto show the next 2 buttons
  */

  const [nycData, setNycData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getNYCData = async () => {
    try {
      const response = await fetch("http://localhost:3001/nycPublicData/all", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const res = response.json();
        res.then((data) => {
          setNycData(data);
          setIsLoaded(true);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNYCData();

    return () => {
      console.log("Fetched QuickInfo");
    };
  }, [isLoaded]);

  if (isLoaded) {
    let arr = nycData;
    return (
      <div>
        <h2 className="display-6">Bathrooms according to NYC Public Data</h2>
        <Container
          style={{
            backgroundColor: "#306b64",
          }}
          className="my-3 scrollable p-3 "
        >
          {arr.map((element, index) => (
            <InfoCard
              name={element.name}
              location={element.location}
              key={index}
            ></InfoCard>
          ))}
        </Container>
        <Container>
          <Row>
            <Col xs={8}>
              <h3 className="display-6"> Have a spot you want to share? Add it to our database!</h3>
            </Col>
            <Col xs={4}>
              <Link to={"/submit"}>
              <Button>Submit Here!</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
};

export default QuickInfo;
