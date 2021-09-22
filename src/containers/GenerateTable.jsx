import React, { useState, useEffect, useRef } from "react";
import {
  FormGroup,
  Row,
  Label,
  Input,
  Col,
  ListGroup,
  Card,
  Container,
  Button,
} from "reactstrap";
import ordinalNum from "../ordinalNumbers";
import "../styles/GenerateTable.css";
import TableModal from "../components/TableModal";
import axios from "axios";
import apiPath from "../const";

export default function GenerateTable() {
  // const AllSubjects = [
  //   [
  //     [
  //       {
  //         id: 1,
  //         subjectName: "sub1",
  //         date: "16/6/2021",
  //         time: "9:00",
  //       },
  //       { id: 2, subjectName: "sub2", date: "16/6/2021", time: "12:00" },
  //       { id: 3, subjectName: "sub1", date: "16/6/2021", time: "9:00" },
  //       { id: 4, subjectName: "sub2", date: "16/6/2021", time: "12:00" },
  //       { id: 5, subjectName: "sub1", date: "16/6/2021", time: "9:00" },
  //       { id: 6, subjectName: "sub2", date: "16/6/2021", time: "12:00" },
  //       { id: 7, subjectName: "sub1", date: "16/6/2021", time: "9:00" },
  //     ],
  //     [
  //       { id: 8, subjectName: "sub10", date: "16/6/2021", time: "9:00" },
  //       { id: 9, subjectName: "sub2", date: "16/6/2021", time: "12:00" },
  //       { id: 10, subjectName: "sub1", date: "16/6/2021", time: "9:00" },
  //       { id: 11, subjectName: "sub2", date: "16/6/2021", time: "12:00" },
  //       { id: 12, subjectName: "sub1", date: "16/6/2021", time: "9:00" },
  //       { id: 13, subjectName: "sub2", date: "16/6/2021", time: "12:00" },
  //       { id: 14, subjectName: "sub1", date: "16/6/2021", time: "9:00" },
  //     ],
  //   ],
  //   [
  //     [
  //       { id: 15, subjectName: "sub1", date: "16/6/2021", time: "9:00" },
  //       { id: 16, subjectName: "sub2", date: "16/6/2021", time: "12:00" },
  //       { id: 17, subjectName: "sub1", date: "16/6/2021", time: "9:00" },
  //       { id: 18, subjectName: "sub2", date: "16/6/2021", time: "12:00" },
  //       { id: 19, subjectName: "sub1", date: "16/6/2021", time: "9:00" },
  //       { id: 20, subjectName: "sub2", date: "16/6/2021", time: "12:00" },
  //       { id: 21, subjectName: "sub1", date: "16/6/2021", time: "9:00" },
  //     ],
  //     [
  //       { id: 22, subjectName: "sub10", date: "16/6/2021", time: "9:00" },
  //       { id: 23, subjectName: "sub2", date: "16/6/2021", time: "12:00" },
  //       { id: 24, subjectName: "sub1", date: "16/6/2021", time: "9:00" },
  //       { id: 25, subjectName: "sub2", date: "16/6/2021", time: "12:00" },
  //       { id: 26, subjectName: "sub1", date: "16/6/2021", time: "9:00" },
  //       { id: 27, subjectName: "sub2", date: "16/6/2021", time: "12:00" },
  //       { id: 28, subjectName: "sub1", date: "16/6/2021", time: "9:00" },
  //     ],
  //   ],
  // ];

  const helperArray = [
    [[], []],
    [[], []],
    [[], []],
    [[], []],
    [[], []],
  ];
  const [AllSubjects, setAllSubjects] = useState([]);
  const changeForm = (data) => {
    data.forEach((exam) => {
      helperArray[exam.subject.year - 1][exam.subject.semester - 1].push({
        id: exam._id,
        subjectName: exam.subject.name,
        date: new Date(exam.date).toLocaleString("en", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        time: new Date(exam.date).toLocaleTimeString("en", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      });
    });
    setAllSubjects([...helperArray]);
  };
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const { data, status } = await axios.get(`${apiPath}/edate`);
        changeForm(data.dates);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSubjects();
  }, []);

  const [studentSubjects] = useState(new Set());

  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen((p) => !p);
  };
  const handelSubmit = () => {
    setIsOpen((prev) => !prev);
  };
  const changeHandler = (event) => {
    AllSubjects.forEach((year) => {
      year.forEach((semester) => {
        semester.forEach((subject) => {
          if (subject.id == event.target.name)
            studentSubjects.has(subject)
              ? studentSubjects.delete(subject)
              : studentSubjects.add(subject);
        });
      });
    });
  };
  const exportTo = useRef();
  return (
    <>
      <Container>
        <>
          {AllSubjects.map((year, yearId) => (
            <Card className="card" key={yearId}>
              <h3
                style={{ margin: "1rem 0", borderBottom: "2px solid red" }}
              >{`the ${ordinalNum[yearId]} year subjects`}</h3>
              <Row>
                {year.map((semester, semesterId) => (
                  <Col xs="6" key={semesterId}>
                    <h5>{`the ${ordinalNum[semesterId]} semester subjects`}</h5>
                    <Label check>
                      <Input
                        type="checkbox"
                        onChange={() => {
                          semester.forEach((e) => {
                            document.querySelector(`[name="${e.id}"]`).click();
                          });
                        }}
                      />
                      <span style={{ marginLeft: 8 }}>Select All Semester</span>
                    </Label>
                    <ListGroup>
                      {semester.map((subject, subjectId) => (
                        <FormGroup check key={subjectId}>
                          <Label check>
                            <Input
                              type="checkbox"
                              name={subject.id}
                              onChange={changeHandler}
                            />
                            {subject.subjectName}
                          </Label>
                        </FormGroup>
                      ))}
                    </ListGroup>
                  </Col>
                ))}
              </Row>
            </Card>
          ))}
          <Button onClick={handelSubmit} style={{ marginBottom: "1rem" }}>
            make my calender
          </Button>

          <TableModal
            ref={exportTo}
            isOpen={isOpen}
            exportTo={exportTo}
            toggleModal={toggleModal}
            data={studentSubjects}
          />
        </>
      </Container>
    </>
  );
}
