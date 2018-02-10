import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      choices: [],
      participants: [],
      choiceInputs: ["input-0"],
      emailInputs: ["input-0"]
    };
  }

  handleInputChange = event => {
    const { name, value, key } = event.target;
    this.setState({
      [name]: value
    });
  };

  // verifyForm = () => {
  //   API.getSurvey()
  //     .then(res =>
  //       this.setState({
  //         name: "",
  //         description: "",
  //         choices: [],
  //         participants: []
  //       })
  //     )
  //     .catch(err => console.log(err));
  // };

  handleFormSubmit = event => {
    event.preventDefault();
    let input = document.getElementsByClassName("choices");
    for (let i = 0; i < input.length; i++) {
      let newChoice = input[i].value;
      this.state.choices.push(newChoice);
    }

    let input2 = document.getElementsByClassName("email");
    for (let i = 0; i < input2.length; i++) {
      let newEmail = input2[i].value;
      this.state.participants.push(newEmail);
    }

    const formData = {
      name: this.state.name,
      description: this.state.description,
      choice: this.state.choices,
      participant: this.state.participants
    };
    console.log(formData);
    if (this.state.name && this.state.description) {
      API.saveForm(formData)
        .then(res => this.props.history.push("/Verify"))
        .catch(err => console.log(err));
    }
  };

  addChoice = () => {
    const newInput = `input-${this.state.choiceInputs.length}`;
    this.setState({ choiceInputs: [...this.state.choiceInputs, newInput] });
  };

  addEmail = () => {
    const newInput = `input-${this.state.emailInputs.length}`;
    this.setState({ emailInputs: [...this.state.emailInputs, newInput] });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="m12">
            <form>
              <label htmlFor="name">Title Name</label>
              <Input
                key="title-input"
                value={this.state.name}
                onChange={this.handleInputChange}
                name="name"
                placeholder="Title Name (required)"
              />
              <label htmlFor="description">Description</label>
              <Input
                key="description"
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder="Description (Required)"
              />
              <label htmlFor="choice">Choices</label>
              <button
                onClick={e => {
                  e.preventDefault();
                  this.addChoice();
                }}
              >
                Add Choice
              </button>
              {this.state.choiceInputs.map(choiceInput => {
                return (
                  <div className="form-control" key={choiceInput}>
                    <Input
                      key={choiceInput}
                      className="choices"
                      value={this.state.choice}
                      name="choices"
                      placeholder="Choice (required)"
                    />
                  </div>
                );
              })}
              <label htmlFor="email">Participant Emails</label>
              <button
                onClick={e => {
                  e.preventDefault();
                  this.addEmail();
                }}
              >
                Add Participant
              </button>
              {this.state.emailInputs.map(emailInput => {
                return (
                  <div className="form-control" key={emailInput}>
                    <Input
                      key={emailInput}
                      className="email"
                      value={this.state.participant}
                      name="participants"
                      placeholder="Email (required)"
                    />
                  </div>
                );
              })}
              <FormBtn
                disabled={!(this.state.name && this.state.description)}
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
