import React, {Component} from "react";
//import API from "../../utils/API";
import {Link} from "react-router-dom";
import {List, ListItem} from "../../components/List"
import {FormBtn, Input} from "../../components/Form"
import { Col, Row, Container } from "../../components/Grid";
import Wrapper from "../../components/Wrapper";
import axios from "axios"


class Survey extends Component {
   
   state = {

     participantEmail: "ewartle@yahoo.com",
     admin: "Julie",
     decision: "Family Vacation",
     totalPoints: 0,
     choice: [{ votes:"0"}, {votes:"0"}, {votes:"0"}, {votes:"0"}, {votes:"0" }],
     options: [{option:"China"}, {option: "US"}, {option: "India"}, {option: "Chile"}, {option: "Morocco"}]

  };

  componentDidMount() {
   this.loadChoice();
    console.log("hello")
  }

  loadChoice = () => {
   axios.get("/api/admin/adminpage/"+ sessionStorage.getItem("id"))
       .then((response) => {
           console.log(response);
           this.setState({ surveys: response.data.surveys})
       })
       .catch(err => {
           console.log(err.message);
       })
 };


 handleInputChange = (event) => {
   const reducer = (accumulator, currentValue) => accumulator + currentValue;
   const id = event.target.id
   const choice = this.state.choice
   let value= event.target.value;
   choice[id].votes = value;
   let array = [];
   let newState = {...this.state}
   newState.choice = choice;
     
   for (let i = 0; i<newState.choice.length; i++) {
        array.push(parseInt(newState.choice[i].votes));
   }
   newState.totalPoints = array.reduce(reducer);

   this.setState(newState);
   if (newState.totalPoints > 100 ) {
    alert ("Your vote total cannot exceed 100 points");
   }
   

  };

  handleFormSubmit= event => {
    event.preventDefault();
          if (this.state.totalPoints <=100 ){
          const payload =[];
          for (let i = 0; i<this.state.choice.length; i++) {
              payload.push(parseInt(this.state.choice[i].votes));
          }
          console.log(payload);
          axios.post("/api/admin/admin/"+this.state.participantId, payload).then((response)=>{
            console.log(response)}).catch((err)=> {
            console.log(err.message);
          });
         
          alert(`Thank you for casting your votes!  ${this.state.admin} will be in touch with you about the results.`)
          this.setState({
            admin: "",
            decision: "",
            totalPoints: "",
            choice: [],
            options: [],
          });       
         this.props.history.push("/");
       } 
       else {
        alert("Your vote total must be less than 100.");

       }
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

              {this.state.options.map((options, i) => (
                  <ListItem key={options._id}>
                     <strong>
                           Option {i+1}: {options.option}
                      </strong>
                  </ListItem>
                ))}
                {this.state.choice.map((choice, i) => (
                  <ListItem key={choice._id}>
                     
                      <Input
                      id={i}
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
              <button><Link to="/" style={{ color: "black"}} > Back to User Page</Link></button> 
                  
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

