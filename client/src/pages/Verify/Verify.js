import React, {Component} from "react";
import {Link} from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import axios from "axios";
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

componentWillMount() {
    this.loadChoice();
};

loadChoice = () => {
    axios.get("/api/admin/results/" + this.props.match.params.id)
        .then((response) => {
            const result = response.data;
            let choice = [];
            let participant = [];
            let email = [];
            let name = result.name;
            let description = result.description;
            for (let i = 0; i < result.participant.length; i++) {
                email.push(result.participant[i].email);
            }
            for (let i = 0; i < result.choice.length; i++) {
                choice.push(result.choice[i].toString());
            }
            for (let i = 0; i < result.participant.length; i++) {
                participant.push(result.participant[i]._id);
            }

            this.setState({
                choice: choice,
                emails: email,
                participant: participant,
                name: name,
                description: description,
                surveyId: response.data._id,
                admin: sessionStorage.getItem("name"),
                adminEmail: sessionStorage.getItem("email")
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
     const link = `https://testhappy.herokuapp.com/survey/${emailOutput.surveyId}/${partId}`
     const NodeMailerInput = [emailRecip, link, emailOutput.admin, emailOutput.adminEmail, emailOutput.name];
    
    axios.post("/send", NodeMailerInput)
      .then((response)=>{
      })
      .catch((err)=> {
         console.log(err);
      });
     NotificationManager.success(`Your survey has been emailed to ${emailRecip}.`, 'Success!', 3000);
};

  render(){
     return(
       <div>
         <Container className>
           <Row>
              <Col size="m12">
                  <h3><div class="card-panel  amber  center-align">{this.state.name}</div></h3>
                    <h5 className = "left-align">Description:  {this.state.description}</h5>
              </Col>
            </Row>
            <Row>
              <div className = "col m6"> 
                 <ul className ="collection with-header" style={{ border: "1px solid #ffc107"}}>
                  <li className ="collection-header" style={{ "borderBottom": "1px solid #ffc107"}}><h5>Options</h5></li>
                     {this.state.choice.map((choice, i) => (
                      <li className = "collection-item"><h6> <i className="material-icons">check</i> Option {i+ 1}:  {choice}</h6></li>
                    ))}
                 </ul>             
             </div>
             
                <div className = "col m6">  
               
                <ul className ="collection with-header" style={{ border: "1px solid #ffc107"}}>
                       <li className ="collection-header" style={{ "borderBottom": "1px solid #ffc107"}}><h5>Participants</h5></li>
                            {this.state.emails.map((emails, i) => (
                                       
                                        
                                         <li className = "collection-item dismissable" key={this.state.emails._id}> <h6>{emails}</h6>
                                        
                                       
                                         <FormBtn className = 'btn btn-success' id = {i} onClick={this.sendEmail} >Send Survey</FormBtn> </li>    
                                        
                                         
                                 ))}
                    </ul>
              </div>
            </Row>  
               
               <FormBtn className = 'btn btn-success '><Link to="/User" > Back to User Page</Link></FormBtn> 
                         
            <NotificationContainer/>

           </Container>
         
       </div>

     );
   }
 
 }
 export default Verify;
