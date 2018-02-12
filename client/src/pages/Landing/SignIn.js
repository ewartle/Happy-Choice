import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import { Link } from "react-router-dom";
import axios from "axios";

class SignIn extends Component {
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

  handleAdminLogin = event => {
    event.preventDefault();
    axios
      .get("/api/admin/" + this.state.email)
      .then(response => {
        if (response.data.password === this.state.password) {
          sessionStorage.setItem("id", response.data._id);
          this.props.history.push("/User");
        } else {
          console.log("Invalid password");
        }
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
                <FormBtn onClick={this.handleAdminLogin}>Sign In</FormBtn>
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

export default SignIn;
