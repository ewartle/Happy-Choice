import React, {Component} from "react";
import {FormBtn, Input} from "../../components/Form"
import {Col, Row, Container} from "../../components/Grid";
import axios from "axios"
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
class Survey extends Component {
  state = {

     participant: "",
     admin: "",
     name: "",
     totalPoints: 0,
     votes: [],
     choice: [],
     description: ""

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
            let participant = window.location.pathname.split("/").pop();
            let name = result.name;
            let description = result.description;
            let votesarray = [];
            for (let i = 0; i < result.choice.length; i++) {

                choice.push(result.choice[i].toString());
                votesarray.push({vote: 0 });
                
            }
           
            this.setState({
                choice: choice,
                participant: participant,
                name: name,
                description: description,
                votes: votesarray

            });
            console.log(this.state);
            this.loadAdmin();
        })
        .catch(err => {
            console.log(err.message);
        })
};

loadAdmin = event => {
    
    axios.get("/api/admin/ewart@email.com")
        .then((response) => {
            console.log(response);   

            this.setState({
                admin: response.data.name  
            });
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

};

  handleFormSubmit= event => {
    event.preventDefault();
    if (this.state.totalPoints <=100 ){
          const payload =[];
          for (let i = 0; i<this.state.votes.length; i++) {
              payload.push(parseInt(this.state.votes[i].vote));
          }
         NotificationManager.success(`Thank you for casting your votes!  ${this.state.admin} will be in touch with you about the results.`, 'Success!', 5000);
           const surveyInput = [payload, this.state.participant];
          axios.post("/api/admin/admin/"+this.state.participant, surveyInput).then((response)=>{
            console.log(response)}).catch((err)=> {
            console.log(err.message);
          });
          this.setState({
            admin: "",
            name: "",
            participant: "",
            description: "",
            totalPoints: 0,
            votes: [],
            options: [],
            admin: []
            
          });         
        
         this.props.history.push("/");
       } 
       else {
      
        NotificationManager.warning('Your vote total cannot exceed 100 points.', 'Warning', 5000);

       }
  };

  render(){
    return(
      <div>
        <Container>
          <Row>
            <Col size="md 12">
                    <h1> {this.state.name} </h1>
                    <div className="divider"></div>
                     <div className="section">
                          <h5>Description</h5>
                            <p>{this.state.description}</p>
                     </div>
                     <div className="section">
                          <h5>Here are your Options</h5>
                            <ul> 
                            {this.state.choice.map((choice, i) => (
                                        <li> <i className="material-icons">check</i> <strong> {this.state.choice[i]} </strong> </li>
                                        ))}
                            </ul>
                     </div>    
                     <div className="divider"></div>
                          <div className="section">
                            <h5>Instructions</h5>
                            <p> You have 100 points total that you can allocate to the following options.  To allocate, click on the ball and slide to the appropriate number.  Once you have designated your allocations, click the submit button.</p>
                          </div> 
                          <div className="divider"></div>
                          <div className="section">
                             
                         <table className = "highlight">
                          <thead>
                            <tr>
                             <th><h5>Vote Here!</h5></th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.votes.map((votes, i) => (
                            <tr><td>
                                <div className ="range-field range">
                                 <h6> Your votes for {this.state.choice[i]}: {this.state.votes[i].vote} </h6> 
                                  <Input
                                  id={i}
                                  min = "0"
                                  max = "100"
                                  value={this.state.votes.vote}
                                  name="votes"
                                  onChange={this.handleInputChange}
                                  type="range"
                                  defaultValue = "0" 
                                   
                                  /> 
                                    </div>
                            </td></tr>  
                             ))}
                            </tbody>
                              </table> 
                      </div>      
                       <div className="divider"></div>
      <div className="section"> 
        
                Total Points:
                      <div> {this.state.totalPoints} </div>
           
            </div>
             <div className="divider"></div>

             <div className="section"> 
              
              <FormBtn onClick={this.handleFormSubmit}>Submit Survey</FormBtn>
             
            </div>
                <div className="divider"></div>
            <div>
                 <NotificationContainer/>
              </div>
            </Col>
                </Row>  
          </Container>

      </div>
     
    );
  }
}
export default Survey;

