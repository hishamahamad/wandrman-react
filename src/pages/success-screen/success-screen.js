import React, { Component } from "react";
import { Segment, Image, Button } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import './success-screen.css';

export default class SuccessScreen extends Component {
  render() {
    return (
      <Segment attached className="menu-page">
        <div className="success-container">
          <h2>Congratulations!</h2>
          <Image
            src={require("../../wandrman-logo.png")}
            alt="wandrman-logo"
            height={170}
          />
          <h2>Your ticket has been reserved!</h2>
          <Button as={Link} to={'/reservations'} content="See reservation" className="reservation-button" />
        </div>
      </Segment>
    );
  }
}
