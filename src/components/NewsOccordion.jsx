import React from "react";
import { Container, UncontrolledCollapse, Button, Row, Col } from "reactstrap";
import NewsCard from "../components/NewsCard";
import ordinalNum from "../ordinalNumbers.js";

export default function NewsOccordion({ news, id }) {
  return (
    <>
      <Button
        id={`${ordinalNum[id]}`}
        block
        style={{ margin: "1rem auto", width: "100%" }}
      >
        {ordinalNum[id]} year news
      </Button>
      <UncontrolledCollapse toggler={`#${ordinalNum[id]}`}>
        <Container>
          <Row>
            {news.map((news, id) => (
              <Col xs="12" md="4" key={id}>
                <NewsCard news={news} />
              </Col>
            ))}
          </Row>
        </Container>
      </UncontrolledCollapse>
    </>
  );
}
