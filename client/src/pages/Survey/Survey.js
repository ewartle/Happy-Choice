import React, {Component} from "react";
//import API from "../../utils/API";
import {Link, Redirect} from "react-router-dom";
import {List, ListItem} from "../../components/List"
import Alert from "../../components/Alert/Alert";
import {FormBtn, Input, Slider, TextArea} from "../../components/Form"
import { Col, Row, Container } from "../../components/Grid";
import Wrapper from "../../components/Wrapper";

class Survey extends Component {
  
  state = {

     admin: "Julie",
     decision: "Family Vacation",
     totalPoints: "0",
     choice: [{ name:'US', votes:"" },
     { name:'China', votes:"" },
     { name:'Europe(ESA)', votes:"" },
     { name:'India', votes:"" },
     { name:'Japan', votes:"" }
     ]

  };

  componentDidMount() {
   // this.loadChoice();
    console.log("hello")
  }

//var total = choice.reduce (function(preVal, elem) {
    //return preVal + elem.votes;}, 0);

//loadChoices function --this function loads the choices submitted by the Admin.
 // loadChoice = () => {
 //  API.getChoices()
  //    .then(res =>
  //      this.setState({choice: res.data, name: ""})
  //    )
    //  .catch(err => console.log(err));
 //   };


 handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    if (value >100){
      alert(`You can only cast 100 votes.`);
      value === 0
    }
    //console.log(value);
    //const name = event.target.name;
    //console.log(name);
    //this.setState({
   //   [name]: value
      
   // });
   
 
  };

  handleFormSubmit= event => {
   
    event.preventDefault();
    //we will add a post route here to send all the points.
    alert(`Thank you for casting your votes!  ${this.state.admin} will be in touch with you about the results.`)
    this.setState({
      admin: "",
      decision: "",
      totalPoints: "",
      choice: {}
    });       
    this.props.history.push("/");
  };

  render(){
    return(
      <Wrapper>
      <div>
        <Container fluid>
        <Container>
          <Row>
            <Col size="md-12">
            <h1> {this.state.decision} </h1>
            <h4> Instructions </h4>
            <p> You have 100 points total that you can allocate to the following options.  To allocate, click on the ball and slide to the appropriate number.  Once you have designated your allocations, click the submit button.</p>
            </Col>
          </Row>
          <Row>
            <Col size = "md-12">  
              <List>
                {this.state.choice.map((choice, i) => (
                  <ListItem key={choice._id}>
                      <strong>
                           Option {i+1}: {choice.name}
                      </strong>
                      <Input id = {i} 
                      value={this.state.choice.votes}
                      name="votes"
                      onChange={this.handleInputChange}
                      type="number"
                      placeholder="Enter your votes here"

                  />      
                      
                  </ListItem>
                ))}
                Total Points:
                      <div> {this.state.totalPoints} </div>
              </List>
              <FormBtn onClick={this.handleFormSubmit}>Submit Survey</FormBtn>
              <br/>
              <br/>
              <FormBtn><Link to="/" style={{ color: "black"}} > Back to User Page</Link></FormBtn> 
                   
            </Col>
          </Row>  

          </Container>
        </Container>
      </div>
      </Wrapper>
    );
  }

}
export default Survey;

