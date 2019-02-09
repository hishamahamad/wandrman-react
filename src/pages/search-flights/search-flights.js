import React, { Component } from "react";
import _ from "lodash";
import { Segment, Form, Button, Search } from "semantic-ui-react";
import "./search-flights.css";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { SingleDatePicker } from "react-dates";
import airports from "../../airports_small.json";
import { Link } from "react-router-dom";
import moment from 'moment';

export default class SearchFlights extends Component {
  state = {
    date: null,
    dateValue: null,
    focused: null,
    searchLoading: false,
    resultsFrom: [],
    valueFrom: "",
    isLoadingFrom: false,
    iataFrom: "",
    resultsTo: [],
    valueTo: "",
    isLoadingTo: false,
    iataTo: ""
  };

  handleDateChange = date => {
    this.setState({ date: moment(date).format('DD-MM-YYYY'),  dateValue: date });
  };

  handleSearchButton = () => {
    this.setState({ searchLoading: true });
    setTimeout(this.setState({ searchLoading: false }), 5000);
  };

  handleSearchChangeFrom = (e, { value }) => {
    this.setState({ isLoadingFrom: true, valueFrom: value });

    setTimeout(() => {
      if (this.state.valueFrom.length < 1) return this.resetComponentFrom();

      const re = new RegExp(_.escapeRegExp(this.state.valueFrom), "i");
      const isMatch = result => re.test(result.city);

      this.setState({
        isLoadingFrom: false,
        resultsFrom: _.filter(airports.data, isMatch)
      });
    }, 300);
  };

  handleSearchChangeTo = (e, { value }) => {
    this.setState({ isLoadingTo: true, valueTo: value });

    setTimeout(() => {
      if (this.state.valueTo.length < 1) return this.resetComponentTo();

      const re = new RegExp(_.escapeRegExp(this.state.valueTo), "i");
      const isMatch = result => re.test(result.city);

      this.setState({
        isLoadingTo: false,
        resultsTo: _.filter(airports.data, isMatch)
      });
    }, 300);
  };

  goToFlightsList = () => {
    this.props.history.push("/flights-list");
  };

  resetComponentFrom = () =>
    this.setState({
      isLoadingFrom: false,
      resultsFrom: [],
      valueFrom: "",
    });

  resetComponentTo = () =>
    this.setState({
      isLoadingTo: false,
      resultsTo: [],
      valueTo: ""
    });

  handleResultSelectFrom = (e, { result }) =>
    this.setState({
      valueFrom: `${result.city} (${result.name})`,
      iataFrom: `${result.iata}`
    });

  handleResultSelectTo = (e, { result }) =>
    this.setState({
      valueTo: `${result.city} (${result.name})`,
      iataTo: `${result.iata}`
    });

  render() {
    const { to, staticContext, ...rest } = this.props;
    const { isLoadingFrom, resultsFrom, valueFrom, isLoadingTo, dateValue,
         resultsTo, valueTo, focused, searchLoading, date, iataFrom, iataTo } = this.state;
    return (
      <Segment attached className="menu-page">
        <div className="search-flights-container">
          <Form>
            <Form.Field>
              <label>From</label>
              <Search
                loading={isLoadingFrom}
                onResultSelect={this.handleResultSelectFrom}
                onSearchChange={_.debounce(this.handleSearchChangeFrom, 500, {
                  leading: true
                })}
                results={resultsFrom}
                value={valueFrom}
                {...rest}
              />
            </Form.Field>
            <Form.Field>
              <label>To</label>
              <Search
                loading={isLoadingTo}
                onResultSelect={this.handleResultSelectTo}
                onSearchChange={_.debounce(this.handleSearchChangeTo, 500, {
                  leading: true
                })}
                results={resultsTo}
                value={valueTo}
                {...rest}
              />
            </Form.Field>
            <Form.Field>
              <label>When</label>
              <SingleDatePicker
                inputIconPosition="after"
                small={true}
                block={false}
                numberOfMonths={1}
                date={dateValue}
                onDateChange={date => this.handleDateChange(date)}
                focused={focused}
                onFocusChange={({ focused }) => this.setState({ focused })}
                openDirection="down"
                hideKeyboardShortcutsPanel={true}
                monthFormat="MMMM YYYY"
                displayFormat={() => "DD/MM/YYYY"}
              />
            </Form.Field>
            <Button
              loading={searchLoading}
              onClick={this.handleSearchButton}
              primary
              as={Link}
              to={{
                pathname: `${this.props.match.url}/flights-list`,
                search: `?from=${iataFrom};to=${iataTo};date=${date ? date.split('-')[0] : ''}%2F${date ? date.split('-')[1] : ''}%2F${date ? date.split('-')[2] : ''}`
              }}
            >
              Search
            </Button>
          </Form>
        </div>
      </Segment>
    );
  }
}
