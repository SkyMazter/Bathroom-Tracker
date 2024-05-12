import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Submit = () => {
  return (
    <div>
      <Container
        className="rounded my-3"
        style={{
          backgroundColor: "#306b64",
          paddingLeft: "30px",
          paddingRight: "30px",
          paddingTop: "15px"
        }}
      >
        <Row>
          <Col>
            <Link to="/">
              <Button variant="outline-light" className="mb-3">cancel</Button>
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
                <Form.Control placeholder="Name of the Location"></Form.Control>
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text>Address</InputGroup.Text>
                <Form.Control placeholder="Address of the Location"></Form.Control>
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
                  className=""
                  as="textarea"
                  rows={6}
                  placeholder="Describe any rules to access these facilities. Such as making a purchase or hours of operation."
                />
              </Form.Group>
              <Button type="submit" variant="light" className="mb-3">Submit form</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Submit;
