import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { List, ListItem } from "../../components/List";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: "Julie",
      name: ["Summer Vacation","50th birthday celebration","Graduation dinner"],
      active: [false, true, true]
    };
  }
  
  render() {
    return (
      <Container>
        <Row>
          <Col size="m6">
            <img src="/sun.png" />
            <h4>{this.state.admin}</h4>
          </Col>
          <Col size="m6">
            <button className="btn"><Link to="/Form">
              Add New Survey</Link>
            </button>
          </Col>
        </Row>
        <div className="divider"></div>
        <div className="section">
        <Row>
          <Col size="m12" />
          <h3>Active Surveys</h3>
          {this.state.name.length ? (
            <List>
              {this.state.name.map(name => (
                <ListItem key={name._id}>
                  <Link to={"/Result/" + name._id}>
                    <strong>
                      {name}
                    </strong>
                  </Link>
                </ListItem>
              ))}
            </List>
          ) : (
            <strong>No Active Surveys</strong>
          )}
        </Row>
        </div>
        <div className="divider"></div>
        <div className="section">
        <Row>
          <Col size="m12" />
          <h3>Closed Surveys</h3>
          {this.state.name.length ? (
            <List>
              {this.state.name.map(name => (
                <ListItem key={name._id}>
                  <Link to={"/Result/" + name._id}>
                    <strong>
                      {name}
                    </strong>
                  </Link>
                </ListItem>
              ))}
            </List>
          ) : (
            <strong>No Closed Surveys</strong>
          )}
        </Row>
        </div>
      </Container>
    );
  }
}

export default User;
