import React from "react";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import './tabs.css';

const Nav = props => <NavLink exact {...props} activeClassName="active" />;

const Tabs = props => (
  <Menu attached="bottom" tabular className="menu-tabs-bar">
    <Menu.Item
      name="reservations"
      as={Nav}
      to="/reservations"
    >
      Reservations
    </Menu.Item>

    <Menu.Item
      name="search-flights"
      as={Nav}
      to="/search-flights"
    >
      Flights
    </Menu.Item>

    <Menu.Item
      name="elite-dashboard"
      as={Nav}
      to="/elite-dashboard"
    >
      Elite
    </Menu.Item>
  </Menu>
);

export default Tabs;
