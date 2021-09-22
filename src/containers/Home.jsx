import React, { useState, useEffect } from "react";
import { Container, Row, Col, DropdownItem, Button } from "reactstrap";
import NewsCard from "../components/NewsCard";
import HomeImg from "../assets/home.jpg";
import generateImg from "../assets/generate.jpg";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import axios from "axios";
import apiPath from "../const";

export default function Home() {
  const [AllNews, setAllnews] = useState([]);
  const [generalNews, setGeneralNews] = useState([]);
  const helperArray = [[], [], [], [], []];
  const changeForm = (data) => {
    data.forEach((news) => {
      news.target
        ? helperArray[news.target - 1].push(news)
        : setGeneralNews((prev) => [...prev, news]);
    });
    setAllnews([...helperArray]);
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await axios.get(`${apiPath}/news`);
        changeForm(data.news);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNews();
  }, []);
  return (
    <Container>
      <div className="homeFace">
        <Row>
          <Col xs="12" md="6" className="homeContent">
            <h1>WELCOME TO THE ALAMATI STANDS.</h1>
            <p>
              Through my mark, you can follow the developments of the Faculty of
              Informatics Engineering The latest news, your Marks in all
              subjects, and the generation of your own examination program
            </p>
          </Col>
          <Col xs="12" md="6">
            <img width="100%" alt="Home Img" src={HomeImg} />
          </Col>
        </Row>

        <Row>
          GENERAL NEWS
          <DropdownItem divider />
          <Row>
            {generalNews.map((newE, id) => (
              <Col key={id} xs="12" lg="4">
                <NewsCard news={newE} />
              </Col>
            ))}
          </Row>
          <Link to="/news" className="linkStyle">
            read more?
          </Link>
        </Row>
        <Row className="generate">
          <Col xs="12" md="6">
            <h1>GENERATE YOUR EXAM TABLE.</h1>
            <p>
              Generate Your Final Exam and Save your time and effort in
              scheduling the final examination program
            </p>
            <Button>
              <Link
                style={{ color: "#fff", textDecoration: "none" }}
                to="/generate-exam-table"
              >
                GENERATE NOW
              </Link>
            </Button>
          </Col>
          <Col xs="12" md="6">
            <img width="100%" alt="sda" src={generateImg} />
          </Col>
        </Row>
      </div>
    </Container>
  );
}
