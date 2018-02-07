import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import API from "../../utils/API";
import RedirectBtn from "../../components/RedirectBtn";

class Landing extends Component {
  state = {
    name: "",
    password: "",
    email: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.email && this.state.password) {
      API.saveAdmin({
        name: this.state.name,
        password: this.state.password,
        email: this.state.email
      })
        .then(res => this.authenticate())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <h1>Happy Choice App</h1>
            <h1>
              <span role="img">LOGO</span>
            </h1>
          </Col>
        </Row>

        <Row>
          <Col size="md-12">
            <h2>Create Account</h2>
            <form>
              <Input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="name"
                placeholder="Name"
              />
              <Input
                value={this.state.email}
                onChange={this.handleInputChange}
                name="email"
                placeholder="Email"
              />
              <Input
                value={this.state.password}
                onChange={this.handleInputChange}
                name="password"
                placeholder="Password"
              />
              <FormBtn onClick={this.handleFormSubmit}>Create Account</FormBtn>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
          <h2>Sign In</h2>
            <form>
              <Input
                value={this.state.email}
                onChange={this.handleInputChange}
                name="email"
                placeholder="Email"
              />
              <Input
                value={this.state.password}
                onChange={this.handleInputChange}
                name="password"
                placeholder="Password"
              />
              <FormBtn onClick={this.handleFormSubmit}>Sign In</FormBtn>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Landing;
