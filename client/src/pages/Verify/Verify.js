import React, {Component} from "react";
//import API from "../../utils/API";
import {Link} from "react-router-dom";
import {List, ListItem} from "../../components/List"
import { Col, Row, Container } from "../../components/Grid";
import Wrapper from "../../components/Wrapper";
import axios from "axios"
 
 class Verify extends Component {
    state = {

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

handleSubmit= event => {
 
     event.preventDefault();
     const id = event.target.id
     console.log(id);
     const emailRecip = this.state.emails[id];
     console.log(emailRecip);
     const emailOutput = this.state
     console.log(emailOutput);
     const link = `http://localhost:3000/${emailOutput.surveyId}/${emailRecip}`
     console.log(link);
     const NodeMailerInput = [emailRecip, link, emailOutput.admin, emailOutput.decision];
     console.log(NodeMailerInput);

     
    axios.post("/send", NodeMailerInput).then((response)=>{
         console.log(response)}).catch((err)=> {
         console.log(err);
     });
 
    alert(`Thank you ${this.state.admin} submitting your survey.  Your survey has been emailed to ${emailRecip}.`);

    this.setState({
            admin: "",
            decision: "",
            //participants: [],
            //surveyId: ""
          });
    
};

 
   render(){
     return(
       <Wrapper>
       <div>
         
         <Container>
           <Row>
             <Col size="md-12">
                 <h1> {this.state.name} </h1>
                 <p> {this.state.description} </p>
                 <p> You have selected the following choices </p>
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
                                    
                                <ListItem>
                                 Click on the button next to the email to send your survey!
                               </ListItem>
                        
                             {this.state.emails.map((emails, i) => (
                               <ListItem key={this.state.emails._id}>
                                    {emails}

                                    <button id = {i} onClick={this.handleSubmit} style={{ margin: "15px"}} >Send Email</button>
                            
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
 
           
           </Container>
         
       </div>
       </Wrapper>
     );
   }
 
 }
 export default Verify;


