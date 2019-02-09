import React, { Component } from "react";
import { Segment, Card, Input, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./itinerary.css";

export default class Itinerary extends Component {
  render() {
    return (
      <Segment attached className="menu-page">
        <div className="itinerary-container">
          <h2>Pasenger details</h2>
          <Card.Group className="passenger-cards">
            <Card>
              <Card.Content className="passenger-card-content">
                <Input label="Name" />
                <Input label="Age" />
              </Card.Content>
            </Card>
          </Card.Group>
          <h2>Flight Details</h2>
          <Card>
            <Card.Content className="flight-details-content">
              <div className="labels">
                <Card.Meta>From</Card.Meta>
                <Card.Meta>To</Card.Meta>
                <Card.Meta>On</Card.Meta>
                <Card.Meta>Duration</Card.Meta>
                <Card.Meta>Carrier</Card.Meta>
              </div>
              <div className="values">
                <div>Mumbai</div>
                <div>Bangkok</div>
                <div>20 February 2019</div>
                <div>4hr 15min</div>
                <div>Jet Airways</div>
              </div>
            </Card.Content>
          </Card>
          <div className="fare">
            <h3>Flight fare:&nbsp;&nbsp;₹30,000</h3>
          </div>
          <div className="payment-button-array">
            <Button as={Link} to={'/success'} content="Pay in full" className="pay-in-full" />
            <Button as={Link} to={'/reserve-ticket'} content="Reserve ticket" className="reserve-ticket" />
            <Button as={Link} to={'/elite-dashboard'} content="Pay later" className="pay-later" />
          </div>
        </div>
      </Segment>
    );
  }
}
