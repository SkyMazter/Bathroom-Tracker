import { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";

const InfoCard = (props) => {
    
  return (
    <Row className="bg-dark-subtle m-1 rounded">
      <Col className="bg-success-subtle rounded-start">
        <p>{props.name}</p>
        <p>{props.location}</p>
      </Col>
      <Col xs={4} lg={2} className="border-start d-flex justify-content-center align-items-center">
        <Button
          variant="success"
          onClick={() => {
            console.log("clicked");
          }}
        >
          View on Map
        </Button>
      </Col>
    </Row>
  );
};

export default InfoCard;
