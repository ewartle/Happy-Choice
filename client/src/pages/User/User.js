import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import RedirectBtn from "../../components/RedirectBtn";

class User extends Component {
  state = {
    name: "",
    surveys: {}
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <img src="" alt=""/>
            <h4>{this.state.name}</h4>
          </Col>
          <Col size="md-6">
            <RedirectBtn onClick={() => this.addNewSurvey()}>
              Add New Survey
            </RedirectBtn>
          </Col>
        </Row>
        <Row>
          <Col size="md-12" />
          <List>
          <ListItem></ListItem>
          </List>
        </Row>
      </Container>
    );
  }
}

export default User;