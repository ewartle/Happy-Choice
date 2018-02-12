import React, { Component } from "react";
import { Col, Row } from "../../components/Grid";
import { Link } from "react-router-dom";

class Landing extends Component {

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
            sessionStorage.setItem('id', response.data._id);
            sessionStorage.setItem('email', response.data.email);
            sessionStorage.setItem('name', response.data.name);
            this.props.history.push("/User");
        })
        .catch(err => {
            console.log(err.message);
        })
};

handleAdminLogin = event => {
    event.preventDefault();
    axios.get("/api/admin/" + this.state.email)
        .then((response) => {
            if (response.data.password === this.state.password) {
                sessionStorage.setItem('id', response.data._id);
                this.props.history.push("/User");
            } else {
                console.log("Invalid password");
            }
        })
        .catch(err => {
            console.log(err.message);
        })
};

    render() {
    return (
      <div id="landing">
        <Row>
          <Col size="m12">
            <h1>Happy Choice</h1>
            <h2>Happier decisions for groups</h2>
            <p>Happy Choice is an app that maximizes total satisfaction over groups through instant runoff voting. <Link to="/Information">More information...</Link></p>
            <button className="btn">
              <Link to="/CreateAcct">Create Account</Link>
            </button>
            <button className="btn">
              <Link to="/SignIn">Sign In</Link>
            </button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Landing;
