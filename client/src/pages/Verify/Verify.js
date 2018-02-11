import React, {Component} from "react";
import {Link} from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import axios from "axios"
import {FormBtn} from "../../components/Form"
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class Verify extends Component {
    
   state = {
    participant: [],
    decription: "",
    choice: [],
    emails: [],
    admin: "",
    name: "",
    surveyId: "",
    adminEmail: ""
      
   };

 componentDidMount() {
   this.loadChoice();
   this.loadAdmin();
};

loadChoice = () => {
    
 axios.get("/api/admin/results/" + this.props.match.params.id)
//    axios.get("/api/admin/results/5a7cfb19b4234c1b2c4ac1e7")
        .then((response) => {
          console.log(response);
            const result = response.data;
            let choice = [];
            let participant = [];
            let name = result.name;
            let email = [];
            let description = result.description;
            for (let i = 0; i < result.choice.length; i++) {
                choice.push(result.choice[i].toString());
            }
            for (let i = 0; i < result.participant.length; i++) {
                participant.push(result.participant[i]._id);
            }
            for (let i=0; i<result.participant.length; i++) {
              email.push(result.participant[i].email);
            }
            this.setState({
                participant: participant,
                choice: choice,
                emails: email,
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

loadAdmin = event => {
    
    axios.get("/api/admin/ewart@email.com")
        .then((response) => {
            console.log(response);   

            this.setState({
                admin: response.data.name,
                adminEmail: response.data.email  
            });
        })
        .catch(err => {
            console.log(err.message);
        })
};


    
   
sendEmail = event => {
 
     event.preventDefault();
     const id = event.target.id
     const emailRecip = this.state.emails[id];
     const partId = this.state.participant[id];
     const emailOutput = this.state
     const link = `http://localhost:3000/survey/${emailOutput.surveyId}/${partId}`
     const NodeMailerInput = [emailRecip, link, emailOutput.admin, emailOutput.adminEmail, emailOutput.name];
     
     
    axios.post("/send", NodeMailerInput)
      .then((response)=>{
         console.log(response);
        
        
       })
      .catch((err)=> {
         console.log(err);
     });

     NotificationManager.success(`our survey has been emailed to ${emailRecip}.`, 'Success!', 3000);
    
};


   render(){
     return(
       <div>
         <Container>
           <Row>
             <Col size="md-12">
                 <h1> {this.state.name} </h1>
                 <h4> {this.state.description} </h4>
                 <br/>
             
                 <ul className ="collection with-header">
                <li className ="collection-header"><h4>Options</h4></li>
                              
                                  {this.state.choice.map((choice, i) => (
                    <li className = "collection-item"><div> Option {i+ 1}:  {choice}</div></li>
                   ))}
                 </ul>
             
             </Col>
           </Row>
          <Row>
                   <Col size = "md-12">  
                    
                             
                          <ul className ="collection with-header">
                <li className ="collection-header" ><h4>Participants</h4></li>
                
                                  {this.state.emails.map((emails, i) => (
                                         <li className = "collection-item" key={this.state.emails._id}><div> {emails}</div>
                                              <FormBtn className = 'btn btn-success' id = {i} onClick={this.sendEmail} style={{ margin: "15px"}}>Send Survey</FormBtn>
                                         </li>
                                 ))}
                          </ul>
                        
                     
                     <br/>
                       
                   </Col>
               </Row>  
               <button><Link to="/User" style={{ color: "black"}} > Back to User Page</Link></button> 
                       
               
            <NotificationContainer/>
           
           </Container>
         
       </div>
      
     );
   }
 
 }
 export default Verify;
