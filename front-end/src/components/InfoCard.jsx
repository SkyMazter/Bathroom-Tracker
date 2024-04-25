import { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";

const InfoCard = (props) => {
    
  return (
    <Row>
      <Col>
        <p>{props.name}</p>
        <p>{props.location}</p>
      </Col>
      <Col xs={4} lg={2}>
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
