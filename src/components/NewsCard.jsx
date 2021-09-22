import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

export default function NewsCard({ news }) {
  const date = news.date.split("T")[0].replaceAll("-", "/");
  return (
    <>
      <Card className="newsCard">
        <CardBody>
          <CardTitle tag="h5">{news.title}</CardTitle>
          <small className="text-muted">{date}</small>
          <CardText>{news.blog}</CardText>
        </CardBody>
      </Card>
    </>
  );
}
