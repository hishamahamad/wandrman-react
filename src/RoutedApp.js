import React, { Component } from "react";
import _ from "lodash";
import "./RoutedApp.css";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import airports from "./airports_small.json";
import { Route, Redirect, Switch, NavLink } from "react-router-dom";
import SearchFlights from "./pages/search-flights/search-flights";
import EliteDashboard from "./pages/elite-dashboard/elite-dashboard";
import Reservations from "./pages/reservations/reservations";
import {
  Sidebar,
  Menu,
  Icon,
  Segment,
  Image,
  Popup,
  Grid,
  Header,
  Button
} from "semantic-ui-react";
import ReservationDetails from "./pages/reservation-details/reservation-details";
import FlightsList from "./pages/flights-list/flights-list";
import Itinerary from "./pages/itinerary/itinerary";
import SuccessScreen from "./pages/success-screen/success-screen";
import ReserveTicket from "./pages/reserve-ticket-screen/reserve-ticket-screen";
import Login from "./pages/login/login";
import { Auth } from "aws-amplify";

const Nav = props => <NavLink exact {...props} activeClassName="active" />;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("user") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default class RoutedApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      userToken: null,
      date: null,
      focused: null,
      searchLoading: false,
      results: [],
      value: "",
      visible: false,
      logoutloading: false
    };
  }

  async componentDidMount() {
    await Auth.currentAuthenticatedUser()
      .then(user => {
        // console.log(user);
        this.setState({
          username: user.username,
          userToken: user.signInUserSession.accessToken.jwtToken
        });
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch(err => console.log(err));
  }

  handleSignOut = () => {
    this.setState({ logoutloading: true });
    Auth.signOut().then(() => {
      this.setState({ logoutloading: false });
      window.history.push('/login')
      console.log("signed out");
      this.setState({ username: "", userToken: null });
      localStorage.removeItem("user");
    });
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleShowSidebar = () => this.setState({ visible: true });

  handleHideSidebar = () => this.setState({ visible: false });

  handleDateChange = date => this.setState({ date: date });

  handleSearchButton = () => {
    this.setState({ searchLoading: true });
    setTimeout(this.setState({ searchLoading: false }), 5000);
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.city);

      this.setState({
        isLoading: false,
        results: _.filter(airports.data, isMatch)
      });
    }, 300);
  };

  goToFlightsList = () => {
    this.props.history.push("/flights-list");
  };

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" });

  handleResultSelect = (e, { result }) =>
    this.setState({ value: `${result.city} (${result.name})` });

  render() {
    const { visible } = this.state;
    return (
      <div className="container">
        <Menu attached="top" className="navbar">
          <Menu.Item
            name="wandrman"
            onClick={this.handleShowSidebar}
            className="logo"
          >
            <Image src={require("./wandrman-logo.png")} size="mini" />
            Wandrman
          </Menu.Item>
          <Menu.Menu position="right">
            {localStorage.getItem("user") ? (
              <Popup
                trigger={
                  <Menu.Item
                    name={JSON.parse(localStorage.getItem("user")).username}
                  >
                    <Icon name="male" />
                    Hello, {JSON.parse(localStorage.getItem("user")).username}
                  </Menu.Item>
                }
                flowing
                hoverable
              >
                <Grid centered divided columns={1}>
                  <Grid.Column textAlign="center">
                    <Header as="h4">
                      Hi, {JSON.parse(localStorage.getItem("user")).username}
                    </Header>
                    <Button
                      onClick={this.handleSignOut}
                      loading={this.state.logoutloading}
                    >
                      Log Out
                    </Button>
                  </Grid.Column>
                </Grid>
              </Popup>
            ) : (
              <Menu.Item name="login / sign up" as={Nav} to="/login">
                <Icon name="male" />
                Login / Sign Up
              </Menu.Item>
            )}
          </Menu.Menu>
        </Menu>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            inverted
            onHide={this.handleHideSidebar}
            vertical
            visible={visible}
            width="thin"
          >
            <Menu.Item
              as={Nav}
              to="/search-flights"
              onClick={this.handleHideSidebar}
            >
              <Icon name="plane" />
              Flights
            </Menu.Item>
            <Menu.Item
              as={Nav}
              to="/reservations"
              onClick={this.handleHideSidebar}
            >
              <Icon name="inbox" />
              Reservations
            </Menu.Item>
            <Menu.Item
              as={Nav}
              to="/elite-dashboard"
              onClick={this.handleHideSidebar}
            >
              <Icon name="chess queen" />
              Wandrman Elite
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher dimmed={visible}>
            <Switch>
              <Route path="/login" component={Login} />
              <PrivateRoute path="/reserve-ticket" component={ReserveTicket} />
              <PrivateRoute path="/success" component={SuccessScreen} />
              <Route path="/search-flights/itinerary" component={Itinerary} />
              <Route
                path="/search-flights/flights-list"
                component={FlightsList}
              />
              <Route path="/search-flights" exact component={SearchFlights} />
              <Route path="/elite-dashboard" component={EliteDashboard} />
              <PrivateRoute
                path="/reservations/reservation-details"
                component={ReservationDetails}
              />
              <PrivateRoute path="/reservations" component={Reservations} />
              <Redirect from="/" to="/search-flights" />
            </Switch>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}
