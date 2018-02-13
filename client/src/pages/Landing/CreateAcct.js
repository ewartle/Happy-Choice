import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import { Link } from "react-router-dom";
import { Input, FormBtn } from "../../components/Form";
import axios from "axios";

class CreateAcct extends Component {
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
    axios
      .post("/api/admin", payload)
      .then(response => {
        sessionStorage.setItem("id", response.data._id);
        sessionStorage.setItem('email', response.data.email);
        sessionStorage.setItem('name', response.data.name);
        this.props.history.push("/User");
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  render() {
    return (
      <div className="shadow">
          <Row>
            <Col size="m12">
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
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <FormBtn onClick={this.handleFormSubmit}>
                  Create Account
                </FormBtn>
                <button className="btn">
              <Link to="/">Cancel</Link>
            </button>
              </form>
            </Col>
          </Row>
      </div>
    );
  }
}

export default CreateAcct;
