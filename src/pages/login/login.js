import React, { Component } from "react";
import { Segment, Form, Input, Button } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import "./login.css";
import { Auth } from "aws-amplify";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    loginloading: false,
    redirectToReferrer: false
  };

  handleUsernameChange = (e, data) => this.setState({ username: data.value });

  handlePasswordChange = (e, data) => this.setState({ password: data.value });

  handleLogin = () => {
    this.setState({ loginloading: true });
    Auth.signIn(this.state.username, this.state.password)
      .then(user => {
        this.setState({ loginloading: false });
        this.setState({ redirectToReferrer: true });
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch(err => console.log("error occurred during sign in"));
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    return (
      <Segment attached className="menu-page">
        <div className="login-container">
          <div className="login-box">
            <h2>Log in to Wandrman</h2>
            <Form.Field>
              <Input
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleUsernameChange}
              />
            </Form.Field>
            <Form.Field>
              <Input
                type="password"
                icon="asterisk"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handlePasswordChange}
              />
            </Form.Field>
            <Button loading={this.state.loginloading} primary onClick={this.handleLogin}>
              Log in
            </Button>
          </div>
        </div>
      </Segment>
    );
  }
}
