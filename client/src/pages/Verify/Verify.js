import React, {Component} from "react";
//import API from "../../utils/API";
import {Link} from "react-router-dom";
import {List, ListItem} from "../../components/List"
import { Col, Row, Container } from "../../components/Grid";
import Wrapper from "../../components/Wrapper";
import axios from "axios"
 
 class Verify extends Component {
    state = {
      admin: "Julie",
      decision: "Family Vacation",
      participants: [
      { email:"ewartle@hotmail.com" },
      { email:"ewartle@yahoo.com" },
      { email:"ewartle@gmail.com" }
      
      ],
      surveyId: "15"
      
   };

componentDidMount() {
 //   API.________________()
//      .then(res =>
 //       this.setState({
 //         admin: "",
 //         decision: "",
 //         link: "",
 //         participants: [{}]
 //       })
 //     )
 //     .catch(err => console.log(err));
      console.log("hello")
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


