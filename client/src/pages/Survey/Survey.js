import React, {Component} from "react";
//import API from "../../utils/API";
import {Link} from "react-router-dom";
import {List, ListItem} from "../../components/List"
import {FormBtn, Input} from "../../components/Form"
import {Col, Row, Container} from "../../components/Grid";
import Wrapper from "../../components/Wrapper";
import {Panel} from "../../components/Table";
import axios from "axios"


class Survey extends Component {
   
  state = {

     participantEmail: "miki@gmail.com",
     admin: "Julie",
     decision: "Family Vacation",
     totalPoints: 0,
     votes: [{ vote:"0"}, {vote:"0"}, {vote:"0"}, {vote:"0"}],
     choice: ["china", "japan", "India", "mexico"]

  };

  componentDidMount() {
    this.loadChoice();
    
  }

  loadChoice = () => {
     console.log(this.props);
      axios.get("/api/survey/" + this.props.match.params.id)
          .then((response) => {
            console.log(response);
              const result = response.data;
              let choice = [];
              let participant = [];
              let name = result.name;
              let description = result.description;
              for (let i = 0; i < result.choice.length; i++) {

                  choice.push(result.choice[i].toString());
              }
              for (let i = 0; i < result.participant.length; i++) {
                  participant.push(result.participant[i].toString());
              }
              this.setState({
                  choice: choice,
                  emails: participant,
                  name: name,
                  description: description
              });
              console.log(this.state);
          })
          .catch(err => {
              console.log(err.message);
          })
 };


 handleInputChange = (event) => {
   const reducer = (accumulator, currentValue) => accumulator + currentValue;
   const id = event.target.id
   const votes = this.state.votes
   let value= event.target.value;
   votes[id].vote = value;
   let array = [];
   let newState = {...this.state}
   newState.votes = votes;


     
   for (let i = 0; i<newState.votes.length; i++) {
        array.push(parseInt(newState.votes[i].vote));
   }
   newState.totalPoints = array.reduce(reducer);

   this.setState(newState);
    console.log(newState)
   if (newState.totalPoints > 100 ) {
    alert ("Your vote total cannot exceed 100 points");
   }
   

  };

  handleFormSubmit= event => {
    event.preventDefault();
          if (this.state.totalPoints <=100 ){
          const payload =[];
          for (let i = 0; i<this.state.votes.length; i++) {
              payload.push(parseInt(this.state.votes[i].vote));
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
            votes: [],
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
        <Panel>
          <Row>
            <Col size="md-10">
            <h1> {this.state.decision} </h1>
            <h4> Instructions </h4>
            <p> You have 100 points total that you can allocate to the following options.  To allocate, click on the ball and slide to the appropriate number.  Once you have designated your allocations, click the submit button.</p>
            </Col>
          </Row>
          <Row>
          <Col size = "md-7">  
              {this.state.choice.map((choice, i) => (
                  <div>
                   <strong>
                    Option {i+1}:  {choice}
                    </strong>
                 </div>
              ))}    

              <br/>
              <br/>   

            
            
              

             <List>
                {this.state.votes.map((votes, i) => (
                  <ListItem key={votes._id}>
           
                     Option: {i+1}
                      <Input
                      id={i}
                      value={this.state.votes.vote}
                      name="votes"
                      onChange={this.handleInputChange}
                      type="number"
                      placeholder="Enter your votes here"
                  />   
       
                  </ListItem>

                ))}

             </List>
        
                Total Points:
                      <div> {this.state.totalPoints} </div>
           
            
              
              <FormBtn onClick={this.handleFormSubmit}>Submit Survey</FormBtn>
              <br/>
              <br/>
              <button><Link to="/" style={{ color: "black"}} > Back to User Page</Link></button> 
                  
            </Col>  
          </Row>  
          </Panel>
          </Container>
        </Container>
      </div>
      </Wrapper>
    );
  }

}
export default Survey;

