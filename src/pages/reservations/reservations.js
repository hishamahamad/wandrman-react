import React, { Component } from "react";
import { Segment, Button, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./reservations.css";

export default class Reservations extends Component {
  state = {};

  render() {
    const { match } = this.props;
    return (
      <Segment attached className="menu-page">
        <div className="reservations-container">
          <h2>Reservations</h2>
          <Card.Group centered className="reservation-cards">
            <Card>
              <Card.Content>
                <Card.Header>Mumbai - Hyderabad</Card.Header>
                <Card.Meta>Non-stop</Card.Meta>
                <Card.Description>
                  <div className="departure">20 February 2019</div>
                  <div className="carrier">Jet Airways</div>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button basic color="blue">
                    Details
                  </Button>
                </div>
              </Card.Content>
            </Card>
            <Card>
              <Card.Content>
                <Card.Header>Bangalore - Abu Dhabi</Card.Header>
                <Card.Meta>Non-stop</Card.Meta>
                <Card.Description>
                  <div className="departure">21 March 2019</div>
                  <div className="carrier">Etihad Airways</div>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button basic color="blue" as={Link} to={`${match.url}/reservation-details`}>
                    Details
                  </Button>
                </div>
              </Card.Content>
            </Card>
            <Card>
              <Card.Content>
                <Card.Header>Delhi - Istanbul</Card.Header>
                <Card.Meta>via Tehran</Card.Meta>
                <Card.Description>
                  <div className="departure">1 October 2019</div>
                  <div className="carrier">Turkish Airlines</div>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button basic color="blue">
                    Details
                  </Button>
                </div>
              </Card.Content>
            </Card>
          </Card.Group>
        </div>
      </Segment>
    );
  }
}
