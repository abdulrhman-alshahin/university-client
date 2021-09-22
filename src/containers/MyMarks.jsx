import React, { useEffect, useState } from "react";
import MyMarksOccordion from "../components/MyMarksOccordion";
import { useHistory } from "react-router-dom";
import { Container } from "reactstrap";
export default function MyMarks() {
  const [myMarks, setMarks] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const jsonUser = localStorage.getItem("user");
    if (jsonUser) {
      const user = JSON.parse(jsonUser);
      const marks = [
        [[], []],
        [[], []],
        [[], []],
        [[], []],
        [[], []],
      ];
      user.exams.forEach(({ papers, subject }) => {
        const { semester, year, name } = subject;
        const { practicalMark, theoreticalMark } = papers[0];
        marks[year - 1][semester - 1].push({
          subjectName: name,
          TheoreticalMark: theoreticalMark,
          PracticalMark: practicalMark,
        });
      });
      setMarks(marks);
    } else {
      history.push("/login");
    }
  }, []);

  return (
    <Container>
      {myMarks.map((marks, id) =>
        marks[0].length > 0 ? (
          <MyMarksOccordion key={id} id={id} marks={marks} />
        ) : null
      )}
    </Container>
  );
}
