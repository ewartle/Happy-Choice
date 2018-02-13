import React, { Component } from "react";
import { Col, Row } from "../../components/Grid";
import { Link } from "react-router-dom";
import axios from "axios";

class Landing extends Component {

    render() {
    return (
      <div id="landing"><img id="sun" src="/sun4.png" alt="avatar default"/>
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
