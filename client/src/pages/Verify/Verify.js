import React, {Component} from "react";
import {Link} from "react-router-dom";
import {List, ListItem} from "../../components/List"
import { Col, Row, Container } from "../../components/Grid";
import {Panel} from "../../components/Table";
import Wrapper from "../../components/Wrapper";
import axios from "axios"
 
 class Verify extends Component {
    state = {
    participant: [],
    decription: "",
    choice: [],
    emails: [],
    admin: "Julie",
    name: "",
    surveyId: ""
      
   };

componentDidMount() {
   this.loadChoice();
      console.log("hello")
};

loadChoice = () => {
    console.log(this.props);
    axios.get("/api/admin/results/" + this.props.match.params.id)
        .then((response) => {
          console.log(response);
            const result = response.data;
            let choice = [];
            let participant = [];
            let email = [];
            let name = result.name;
            let description = result.description;
            for (let i = 0; i < result.choice.length; i++) {

                choice.push(result.choice[i].toString());
            }
            for (let i = 0; i < result.participant.length; i++) {
                participant.push(result.participant[i]._id);
            }
            for (let i = 0; i < result.participant.length; i++) {
                email.push(result.participant[i].email);
            }
            this.setState({
                choice: choice,
                emails: email,
                participant: participant,
                name: name,
                description: description,
                surveyId: response.data._id
            });
            console.log(this.state);
        })
        .catch(err => {
            console.log(err.message);
        })
};

handleSubmit= event => {
 
     event.preventDefault();
     const id = event.target.id
     console.log(id);
     const emailRecip = this.state.emails[id];
     const partId = this.state.participant[id];
     console.log(emailRecip);
     const emailOutput = this.state
     console.log(emailOutput);
     const link = `http://localhost:3000/survey/${emailOutput.surveyId}/${partId}`
     console.log(link);
     const NodeMailerInput = [emailRecip, link, emailOutput.admin, emailOutput.name];
     console.log(NodeMailerInput);

     
    axios.post("/send", NodeMailerInput).then((response)=>{
         console.log(response)}).catch((err)=> {
         console.log(err);
     });
 
    alert(`Thank you ${this.state.admin} submitting your survey.  Your survey has been emailed to ${emailRecip}.`);
      
};

 
   render(){
     return(
       <Wrapper>
       <div>
         
         <Container>
           <Panel>
           <Row>
             <Col size="md-12">
                 <h1> {this.state.name} </h1>
                 <h4> {this.state.description} </h4>
                 <p> You have selected the following choices: </p>
                 <ul> 
                   {this.state.choice.map((choice, i) => (
                    <li> {choice} </li>
                   ))}
                 </ul>
             </Col>
           </Row>
          
          <br/>
          
          <Row>
                   <Col size = "md-12">  

                    {this.state.emails.length ? (
                           <List>
                                    
                                <p>
                                 Please click "Send Survey" to send the survey to the corresponding email address. 
                                </p>
                        
                             {this.state.emails.map((emails, i) => (
                               <ListItem key={this.state.emails._id}>
                                    {emails}

                                    <button id = {i} onClick={this.handleSubmit} style={{ margin: "15px"}} >Send Survey</button>
                            
                               </ListItem>
                             ))}
                             
                           </List>
                     

                      ): (
              <h3>No Participants</h3>
            )}     

                     <br/>
                     <button><Link to="/" style={{ color: "black"}} > Back to User Page</Link></button> 
                         
                   </Col>
               </Row>  
                </Panel>
 
           
           </Container>
         
       </div>
       </Wrapper>
     );
   }
 
 }
 export default Verify;
