import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import { Modal, ModHeader, ModBody, ModFooter } from "../../components/Modal";
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
    if (this.state.name && this.state.password) {
      API.saveUser({
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
      <Container fluid>
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
