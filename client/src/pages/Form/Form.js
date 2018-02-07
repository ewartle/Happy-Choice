import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { RedirectBtn } from "../../components/RedirectBtn";

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

  verifyForm = () => {
    API.getSurvey()
      .then(res =>
        this.setState({ name: "", description: "", choices: {}, participants: {} })
      )
      .catch(err => console.log(err));
  };

 handleFormSubmit = event => {
   event.preventDefault();
   if (this.state.name && this.state.description) {
     API.saveForm({
       name: this.state.name,
       description: this.state.description,
       choices: this.state.choices,
       participants: this.state.participants
     })
       .then(res => this.verifyForm())
       .catch(err => console.log(err));
   }
 };

//  addChoice = () => {
//               <Input
//                 value={this.state.choice}
//                 onChange={this.handleInputChange}
//                 name="choice{this++}"
//                 placeholder="Choice (required)"
//               />
//               <RedirectBtn onClick={() => this.addChoice()}>
//               Add Choice
//               </RedirectBtn>
//  };


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
                name="choice1"
                placeholder="Choice (required)"
              />
              {/* <RedirectBtn onClick={() => this.addChoice()}>
              Add Choice
              </RedirectBtn> */}

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
