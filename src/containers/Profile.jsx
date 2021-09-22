import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { Card, Container, Row, Col } from "reactstrap";

function Profile() {
  const [user, setUser] = useState({});
  const history = useHistory();
  useEffect(() => {
    const jsonUser = localStorage.getItem("user");
    if (jsonUser) {
      const user = JSON.parse(jsonUser);
      setUser(user);
    } else {
      history.push("/login");
    }
  }, []);
  return (
    <>
      <main className="profile-page">
        <section className="section">
          <Container>
            <Card className="card-profile shadow mt--300">
              <div className="px-4">
                <Row className="justify-content-center">
                  <Col
                    className="order-lg-3 text-lg-right align-self-lg-center"
                    lg="4"
                  ></Col>
                </Row>
                <div className="text-center m-5">
                  <h3>
                    {user.name}
                    <span className="font-weight-light">
                      {" "}
                      with year {user.currentYear}
                    </span>
                  </h3>
                  <div className="h6 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    your ID: {user.studentID}
                  </div>
                  <div className="h6 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    your avg:{" "}
                    {(
                      user?.exams?.reduce((acc, { papers }) => {
                        const { practicalMark, theoreticalMark } = papers[0];
                        return acc + practicalMark + theoreticalMark;
                      }, 0) / user?.exams?.length
                    ).toFixed(1)}
                  </div>
                  <div className="h6 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    this year avg:{" "}
                    {(
                      user?.exams?.reduce((acc, { papers, subject }) => {
                        const { year } = subject;
                        if (year != user.currentYear) return acc;
                        const { practicalMark, theoreticalMark } = papers[0];
                        return acc + practicalMark + theoreticalMark;
                      }, 0) /
                      user?.exams?.reduce((acc, { papers, subject }) => {
                        const { year } = subject;
                        if (year != user.currentYear) return acc;
                        return acc + 1;
                      }, 0)
                    ).toFixed(1)}
                  </div>
                </div>
              </div>
            </Card>
          </Container>
        </section>
      </main>
    </>
  );
}

export default Profile;
