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
     const emailRecip = this.state.participants[id].email;
     console.log(emailRecip);
     const payload = this.state
     console.log(payload);
     const link = `http://localhost:3000/${payload.surveyId}/${emailRecip}`
     console.log(link);
     const NodeMailerInput = [emailRecip, link, payload.admin, payload.decision];
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
    
          
    //this.props.history.push("/");
};

 
   render(){
     return(
       <Wrapper>
       <div>
         
         <Container>
           <Row>
             <Col size="md-12">
             <h1> {this.state.decision} </h1>
            
             </Col>
           </Row>
 
           <Row>
                   <Col size = "md-12">  

                    {this.state.participants.length ? (
                           <List>
                                    
                                <ListItem>
                                  <strong>
                                        Emails:
                                   </strong>
                               </ListItem>
                        
                             {this.state.participants.map((emails, i) => (
                               <ListItem key={this.state.participants._id}>
                                    {this.state.participants[i].email}

                                    <button id = {i} onClick={this.handleSubmit}>Send Email</button>
                            
                               </ListItem>
                             ))}
                             
                           </List>
                     

                      ): (
              <h3>No Participants</h3>
            )}     


                    
                     <br/>
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