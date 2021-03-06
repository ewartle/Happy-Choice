import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import axios from "axios";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      choices: [],
      participants: [],
      choiceInputs: ["input-0"],
      emailInputs: ["input-0"],
      score: []
    };
  }
 
 handleInputChange = event => {
    const { name, value } = event.target;
     this.setState({
       [name]: value
     });
  };
 
 handleFormSubmit = event => {
    event.preventDefault();
    let input = document.getElementsByClassName("choices");
    for (let i = 0; i < input.length; i++) {
      let newChoice = input[i].value;
      if (newChoice) {
      this.state.choices.push(newChoice);
      this.state.score.push(0);
      }
    }

    let input2 = document.getElementsByClassName("email");
    for (let i = 0; i < input2.length; i++) {
      let newEmail = input2[i].value;
      if (newEmail) {
        this.state.participants.push(newEmail);
      }
    }

    const formData = {
      name: this.state.name,
      description: this.state.description,
      choice: this.state.choices,
      participant: this.state.participants,
      score: this.state.score
    };
    console.log(formData);
    if (this.state.name && this.state.description) {
      axios.post("/api/admin/"+ sessionStorage.getItem("id"), formData)
        .then(res => {
          console.log(res);
          const surveyId = res.data.surveys[res.data.surveys.length -1];
          this.props.history.push("/Verify/" + surveyId);
          
          })
        .catch(err => console.log(err));
    };
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
  };
};

export default Form;