import React, { Component } from "react";
import { Segment, Button } from "semantic-ui-react";
import './elite-dashboard.css';

export default class EliteDashboard extends Component {
  state = {};

  render() {
    return (
      <Segment attached className="menu-page">
        <div className="elite-container">
          <h2>Introducing Wandrman Elite</h2>
          <img src={require("../../wandrman-logo.png")} alt="wandrman-logo" height={170}/>
          <div className="elite-description">
            A lifetime membership that includes:
            <ul>
              <li>Post travel payment of tickets</li>
              <li>Attractive deals on flights</li>
              <li>Free airport lounge access</li>
              <li>Free upgrade to first-class</li>
            </ul>
          </div>
          <Button content='Coming Soon' disabled />
        </div>
      </Segment>
    );
  }
}
