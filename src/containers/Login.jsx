import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  FormGroup,
  Label,
  Input,
  Button,
  Form,
} from "reactstrap";
import "../styles/Login.css";
import apiPath from "../const";
import { useHistory } from "react-router-dom";

const passwords = ["root", "admin", "12345678"];

export default function Login() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [studentId, setStudentId] = useState();
  const [adminPass, setAdminPass] = useState();

  const adminHandler = (event) => {
    setAdminPass(event.target.value);
  };

  const studentHandler = (event) => {
    setStudentId(event.target.value);
  };

  const history = useHistory();
  const submitHandler = async (event) => {
    event.preventDefault();
    let student;
    if (isAdmin) {
      if (passwords.includes(adminPass)) {
        window.location.href = "http://localhost:5000/admin";
      }
    }
    axios.get(`${apiPath}/student/${studentId}`).then((res) => {
      localStorage.setItem("user", JSON.stringify(res.data.student));
      history.push("/me");
    });
  };

  return (
    <Container>
      <Form onSubmit={submitHandler}>
        <Row className="center">
          <Col xs="12" md="8">
            <Card className="card">
              <CardTitle tag="h1" className="title">
                LOGIN
              </CardTitle>

              {isAdmin && (
                <FormGroup row>
                  <Label className="lable" for="Admin" sm={12}>
                    Admin Password
                  </Label>
                  <Col sm={12}>
                    <Input
                      type="password"
                      name="password"
                      id="Admin"
                      onChange={adminHandler}
                    />
                  </Col>
                </FormGroup>
              )}
              {!isAdmin && (
                <FormGroup row>
                  <Label className="lable" for="studentId" sm={12}>
                    Student Id
                  </Label>
                  <Col sm={12}>
                    <Input
                      type="number"
                      name="studentId"
                      id="studentId"
                      onChange={studentHandler}
                    />
                  </Col>
                </FormGroup>
              )}

              <FormGroup check>
                <Label className="isAdmin" check>
                  <Input
                    type="checkbox"
                    id="checkbox2"
                    checked={isAdmin}
                    onChange={() => setIsAdmin(!isAdmin)}
                  />{" "}
                  I Am An Admin
                </Label>
              </FormGroup>
              <FormGroup check row>
                <Col>
                  <Button type="submit">LOGIN</Button>
                </Col>
              </FormGroup>
            </Card>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
