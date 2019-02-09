import React, { Component } from "react";
import { Segment, Button } from "semantic-ui-react";
import Slider from "rc-slider/lib/Slider";
import "./reserve-ticket-screen.css";
import { Link } from 'react-router-dom';

export default class ReserveTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderValue: 11500
    };
  }

  handleSliderOnChange = value => this.setState({ sliderValue: value });

  render() {
    return (
      <Segment attached className="menu-page">
        <div className="reserve-ticket-container">
          <h2>Use the slider to pay the minimum fee</h2>
          <Slider min={11500} max={30000} onChange={this.handleSliderOnChange} />
          <div>Reservation fee + first deposit: ₹{this.state.sliderValue}</div>
          <Button as={Link} to={'/success'} content="Pay" className="pay-button"/>
        </div>
      </Segment>
    );
  }
}
