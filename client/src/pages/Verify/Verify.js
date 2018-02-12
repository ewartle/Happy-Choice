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

componentDidMount() {
   this.loadChoice();
   // this.loadAdmin();
};

loadChoice = () => {
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

// loadAdmin = event => {
//     axios.get("/api/admin/ewart@email.com")
//         .then((response) => {
//             console.log(response);   
//             this.setState({
//                 admin: response.data.name,
//                 adminEmail: response.data.email  
//             });
//         })
//         .catch(err => {
//             console.log(err.message);
//         })
// };

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
         console.log(response);
      })
      .catch((err)=> {
         console.log(err);
      });
     NotificationManager.success(`Your survey has been emailed to ${emailRecip}.`, 'Success!', 3000);
};

  render(){
     return(
       <div>
         <Container>
           <Row>
              <Col size="md 12">
                <ul className ="collection with-header">
                  <li className ="collection-header"><h3 className = "center-align">{this.state.name} </h3></li>
                     
                      <li className = "collection-item"><div> Description:  {this.state.description}</div></li>
              
                 </ul> 
              </Col>
            </Row>
            <Row>
              <div className = "col m12"> 
                 <ul className ="collection with-header">
                  <li className ="collection-header"><h4>Options</h4></li>
                     {this.state.choice.map((choice, i) => (
                      <li className = "collection-item"><div> <i className="material-icons">check</i> Option {i+ 1}:  {choice}</div></li>
                    ))}
                 </ul>             
             </div>
             </Row>
             <Row>
                <div className = "col m12">      
                    <ul className ="collection with-header">
                       <li className ="collection-header" ><h4>Participants</h4></li>
                            {this.state.emails.map((emails, i) => (
                                         <li className = "collection-item" key={this.state.emails._id}><div> {emails}</div>
                                              <FormBtn className = 'btn btn-success' id = {i} onClick={this.sendEmail} style={{ margin: "15px"}}>Send Survey</FormBtn>
                                         </li>
                                 ))}
                    </ul>
                       
                   </div>
               </Row>  
             
               <FormBtn className = 'btn btn-success '><Link to="/User" style={{ color: "white"}} > Back to User Page</Link></FormBtn> 
                         
            <NotificationContainer/>

           </Container>
         
       </div>

     );
   }
 
 }

 export default Verify;
