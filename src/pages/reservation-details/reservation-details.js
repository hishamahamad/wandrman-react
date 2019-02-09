import React, { Component } from "react";
import "./reservation-details.css";
import "rc-slider/assets/index.css";
import { Segment, Button } from "semantic-ui-react";
import { Pie } from "react-chartjs-2";
import Slider from "rc-slider/lib/Slider";
import { Link } from 'react-router-dom';

export default class ReservationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        datasets: [
          {
            data: [7500, 22500],
            backgroundColor: ["#172540", "#707070"]
          }
        ],
        labels: ["Paid", "Unpaid"]
      },
      sliderValue: 7500
    };
  }

  handleSliderOnChange = value => this.setState({ sliderValue: value });

  render() {
    const { chartData, sliderValue } = this.state;
    return (
      <Segment attached className="menu-page">
        <div className="reservation-details-container">
          <h2>Bangalore to Abu Dhabi</h2>
          <h3>You board on 21 March 2019</h3>
          <div className="chart-container">
            <Pie data={chartData} />
          </div>
          <h3>Minimum due is ₹7500</h3>
          <h4>You can also use the slider to pay more than the minimum due</h4>
          <Slider min={7500} max={22500} onChange={this.handleSliderOnChange} />
          <h4>Custom amount to pay: ₹{sliderValue}</h4>
          <Button as={Link} to={'/success'} content="Pay" className="pay-button" />
          <Button content="Change dates" className="change-button" />
          <Button content="Cancel ticket" />
        </div>
      </Segment>
    );
  }
}
