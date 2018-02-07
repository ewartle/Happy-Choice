import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { RedirectBtn } from "../../components/RedirectBtn";
import { List, ListItem } from "../../components/List/index";

class Verify extends Component {
  state = {
    name: "",
    description: "",
    choices: [],
    participants: []
  };

  componentDidMount() {
    API.getSurvey()
      .then(res =>
        this.setState({
          name: "",
          description: "",
          choices: [],
          participants: []
        })
      )
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.sendEmail({
      name: this.state.name,
      description: this.state.description,
      choices: this.state.choices,
      participants: this.state.participants
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    alert(`Thank you for submitting your survey! Emails have been sent.`);
    this.setState({
      name: "",
      description: "",
      choices: [],
      participants: []
    });
    this.props.history.push("/User");
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <List>
              <ListItem>{this.state.name}</ListItem>
              <ListItem>{this.state.description}</ListItem>
            </List>

            {this.state.choices.length ? (
              <List>
                {this.state.choices.map((choices, i) => (
                  <ListItem key={choices._id}>{choices.name}</ListItem>
                ))}
              </List>
            ) : (
              <h3>No Choices</h3>
            )}
            {this.state.participants.length ? (
              <List>
                {this.state.participants.map((participants, i) => (
                  <ListItem key={participants._id}>{participants.name}</ListItem>
                ))}
              </List>
            ) : (
              <h3>No Participants</h3>
            )}
            <FormBtn disabled={false} onClick={this.handleFormSubmit}>
              Send Emails
            </FormBtn>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Verify;
