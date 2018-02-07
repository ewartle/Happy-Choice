import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import { Modal, ModHeader, ModBody, ModFooter } from "../../components/Modal";
import { Input, FormBtn } from "../../components/Form";
import RedirectBtn from "../../components/RedirectBtn";
import axios from "axios";

class Landing extends Component {
  state = {
    name: "miki",
    password: "pass",
    email: "hello@gmail.com"
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
    axios.post("/api/admin", payload)
        .then((response) => {
            console.log(response);
            sessionStorage.setItem('id', response.data._id);
        })
        .catch(err => {
            console.log(err.message);
        })
};

  render() {
    return (
      <Container fluid>
       <FormBtn onClick={this.handleFormSubmit}>Sign In</FormBtn>
        <Modal>
          <ModHeader>
            <h4>Sign In</h4>
          </ModHeader>
          <ModBody>
            <Input
              value={this.state.name}
              onChange={this.handleInputChange}
              name="name"
              placeholder="Name"
            />
            <Input
              value={this.state.password}
              onChange={this.handleInputChange}
              name="password"
              placeholder="Password"
            />
          </ModBody>
          <ModFooter>
            <FormBtn onClick={this.handleFormSubmit}>Sign In</FormBtn>
          </ModFooter>
        </Modal>
        <Row>
          <Col size="md-12">
            <h1>Happy Choice App</h1>
            <h1>
              <span role="img">LOGO</span>
            </h1>
            <RedirectBtn onClick={() => this.createAcct()}>
              Create Account
            </RedirectBtn>
            <RedirectBtn onClick={() => this.signIn()}>Sign In</RedirectBtn>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Landing;