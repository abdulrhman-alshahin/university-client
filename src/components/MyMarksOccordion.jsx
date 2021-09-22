import React from "react";
import {
  Container,
  UncontrolledCollapse,
  Button,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import "../styles/MyMarksOccordion.css";
import orinalNum from "../ordinalNumbers";

export default function NewsOccordion({ id, marks }) {
  return (
    <>
      <Button
        id={`${orinalNum[id]}`}
        block
        style={{ margin: "1rem auto", width: "100%" }}
      >
        my {orinalNum[id]} year marks
      </Button>
      <UncontrolledCollapse toggler={`#${orinalNum[id]}`}>
        <Row>
          {marks.map((semester, id) => (
            <Col xs="12" md="6" key={id}>
              <Card className="myMarksCard">
                <ListGroup>
                  <h4>{`${orinalNum[id]} semester`}</h4>
                  {semester.map((mark, id) => (
                    <ListGroupItem key={id}>
                      <Row
                        style={{
                          justifyContent: "space-between",
                        }}
                      >
                        <Col
                          style={{
                            flex: 3,
                          }}
                        >
                          {mark.subjectName}
                        </Col>
                        <Col
                          style={{
                            flex: 1,
                          }}
                        >
                          {mark.TheoreticalMark}
                        </Col>
                        <Col
                          style={{
                            flex: 1,
                          }}
                        >
                          {mark.PracticalMark}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </Card>
            </Col>
          ))}
        </Row>
      </UncontrolledCollapse>
    </>
  );
}
