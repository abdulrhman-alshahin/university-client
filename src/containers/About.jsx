import React from "react";
import { Container, Row, Col } from "reactstrap";
import AboutImg from "../assets/home.jpg";
import "../styles/About.css";

export default function About() {
  return (
    <Container className="aboutContainer">
      <Row>
        <Col xs="12" lg="6" className="aboutContent">
          <h1>Welcome to the Alamati platform.</h1>
          <p>
            Through my mark, you can follow the developments of the Faculty of
            Informatics Engineering The latest news, your Marks in all subjects,
            and the generation of your own examination program
          </p>
        </Col>
        <Col xs="12" lg="6">
          <img width="100%" alt="about img" src={AboutImg} />
        </Col>
      </Row>
    </Container>
  );
}
