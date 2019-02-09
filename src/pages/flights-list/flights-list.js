import React, { Component } from "react";
import qs from "qs";
import { Segment, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./flights-list.css";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export default class FlightsList extends Component {
  state = {};

  render() {
    const param = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
      delimiter: ";"
    });
    console.log('url', this.props.match.url);
    console.log('path', this.props.match.path);
    return (
      <Segment attached className="menu-page">
        <div className="flights-list-container">
          <h2>
            {param.from} to {param.to} for {param.date.split("/")[0]}{" "}
            {months[parseInt(param.date.split("/")[1]) - 1]}{" "}
            {param.date.split("/")[2]}
          </h2>
          <Card.Group className="flights-list-cards">
            <Card
              as={Link}
              to={`/search-flights/itinerary`}
              fluid
            >
              <Card.Content className="flight-card-content">
                <div>Jet Airways</div>
                <Card.Meta>Nonstop</Card.Meta>
                <div>4hr 45min</div>
                <h4>₹30,000</h4>
              </Card.Content>
            </Card>
            <Card as={Link} to="/" fluid>
              <Card.Content className="flight-card-content">
                <div>Air India</div>
                <Card.Meta>Nonstop</Card.Meta>
                <div>4hr 50min</div>
                <h4>₹40,000</h4>
              </Card.Content>
            </Card>
            <Card as={Link} to="/" fluid>
              <Card.Content className="flight-card-content">
                <div>IndiGo</div>
                <Card.Meta>Nonstop</Card.Meta>
                <div>5hr</div>
                <h4>₹50,000</h4>
              </Card.Content>
            </Card>
          </Card.Group>
        </div>
      </Segment>
    );
  }
}
