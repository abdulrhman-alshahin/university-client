import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import NewsOccordion from "../components/NewsOccordion";
import axios from "axios";
import apiPath from "../const";
import NewsCard from "../components/NewsCard.jsx";
export default function News() {
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
      } catch (err) {
        console.log(err);
      }
    };
    fetchNews();
  }, []);
  return (
    <Container>
      {generalNews.length > 0 && (
        <Row>
          {generalNews.map((generalN, id) => (
            <Col xs="12" md="4">
              <NewsCard news={generalN} />
            </Col>
          ))}
        </Row>
      )}

      {AllNews.map(
        (yearNews, id) =>
          yearNews.length > 0 && (
            <NewsOccordion key={id} id={id} news={yearNews} />
          )
      )}
    </Container>
  );
}
