import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import { Input, TextArea, FormBtn } from "../../components/Form";

// update inputs???????????????????????????????
class Form extends Component {
  state = {
    name: "",
    description: "",
    choices: {},
    participants: {}
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   if (this.state.title && this.state.author) {
  //     API.saveForm({
  //       title: this.state.title,
  //       author: this.state.author,
  //       synopsis: this.state.synopsis
  //     })
  //       .then(res => this.loadBooks())
  //       .catch(err => console.log(err));
  //   }
  // };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <form>
              <label for="name">Title Name</label>
              <Input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="name"
                placeholder="Title Name (required)"
              />
              <label for="description">Description</label>
              <TextArea
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder="Description (Required)"
              />
              <label for="choice">Choices</label>
              <Input
                value={this.state.choice}
                onChange={this.handleInputChange}
                name="choice"
                placeholder="Choice (required)"
              />
              <label for="email">Participant Emails</label>
              <Input
                value={this.state.particiapant}
                onChange={this.handleInputChange}
                name="email"
                placeholder="Email (required)"
              />
              <FormBtn
                disabled={!(this.state.name && this.state.description && this.state.choices && this.state.participants)}
                onClick={this.handleFormSubmit}
              >
                Create Survey
              </FormBtn>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Form;