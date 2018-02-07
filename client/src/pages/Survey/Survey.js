import React, {Component} from "react";
//import API from "../../utils/API";
import {Link, Redirect} from "react-router-dom";
import {List, ListItem} from "../../components/List"
import {FormBtn, Input, Slider, TextArea} from "../../components/Form"
import { Col, Row, Container } from "../../components/Grid";
import Wrapper from "../../components/Wrapper";
import axios from "axios"

class Survey extends Component {
  
   state = {

     participantId: "5a7b695873e45c3dbc6c1dfd",
     admin: "Julie",
     decision: "Family Vacation",
     totalPoints: 0,
     choice: [{ votes:""}, {votes:""}, {votes:""}, {votes:""}, {votes:"" }],
     options: []

  };

  componentDidMount() {
   //this.loadChoice();
    console.log("hello")
     }

//var total = choice.reduce (function(preVal, elem) {
    //return preVal + elem.votes;}, 0);

//loadChoices function --this function loads the choices submitted by the Admin.
// loadChoice = () => {

   // axios.get("/api/choices", { params: { q: query}})
    //.then((res => this.setState (res.data {  ""})
   // console.log(res.data)}).catch((err)=> {
    //console.log(err));

 // };
 


 handleInputChange = (event) => {
    // Getting the value and name of the input which triggered the change
   const id = event.target.id
   const choice = this.state.choice
   let totalPoints=this.state.totalPoints
   console.log(totalPoints);
   console.log(choice[id]);
   let value= event.target.value;
   choice[id].votes = value;
  // const array1 = [1, 2, 3, 4];
  // const array = [choice[id].votes]
   //totalPoints = array.forEach(function(element){
   // console.log(element);
  // });
    //total = choice.reduce (function(preVal, elem) {
    //return preVal + elem.votes;}, 0);
   
   let newState = {...this.state}
   newState.choice = choice;
   newState.totalPoints=totalPoints

   this.setState(newState)
   
  };

  handleFormSubmit= event => {
    event.preventDefault();
    const payload =[];
    //we will add a post route here to send all the points.
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
   //this.props.history.push("/");
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

