import React, { Component } from "react";
import { Image , Menu, Icon } from "semantic-ui-react";
import "./header.css";

export default class Header extends Component {
  state = {};

  handleItemClick = () => console.log("navbar clicked");

  render() {
    return (
      <Menu attached="top" className="navbar">
        <Menu.Item
          name="wandrman"
          onClick={this.handleItemClick}
          className="logo"
        >
          <Image src={require("../../wandrman-logo.png")} size="mini" />
          Wandrman
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item name="login / sign up" onClick={this.handleItemClick}>
            <Icon name="male" />
            Login / Sign Up
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
