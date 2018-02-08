import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import {Link} from "react-router-dom";
import { Modal, ModHeader, ModBody, ModFooter } from "../../components/Modal";
import { Input, FormBtn } from "../../components/Form";
import RedirectBtn from "../../components/RedirectBtn";
import axios from "axios";

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
    const payload = this.state;
    console.log(payload);
    axios.post("/api/admin", payload)
        .then((response) => {
            console.log(response);
            sessionStorage.setItem('id', response.data._id);
            
        })
        .catch(err => {
            console.log(err.message);
        })
        this.props.history.push("/User");
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