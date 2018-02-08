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
      link: "www.google.com",
      participants: [
      { email:"ewartle@hotmail.com" },
      { email:"ewartle@yahoo.com" },
      { email:"ewartle@gmail.com" }
      
      ]
      
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
  }
    
 
 
   handleSubmit= event => {
 
     event.preventDefault();
     const payload = this.state
     console.log(payload);
     
     axios.post("/send", payload).then((response)=>{
         console.log(response)}).catch((err)=> {
         console.log(err);
     });
 
 
    alert(`Thank you ${this.state.admin} submitting your survey.  Your survey has been emailed to ${this.state.admin} .`);
    
    this.setState({
        admin: "",
        decision: "",
        //link: ""
        //emails: [],
      
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

                    {this.state.choices.length ? (
                           <List>
 
                           
                               <ListItem key={this.state.link._id}>
                                  <strong>
                                        Link:  {this.state.link}
                                   </strong>
                               </ListItem>
 
                                <ListItem key={this.state.link._id}>
                                  <strong>
                                        Emails:
                                   </strong>
                               </ListItem>
                        
                             {this.state.emails.map((emails, i) => (
                               <ListItem key={emails._id}>
                                  
                                 
                                        {emails.email}
                               
                           
                               </ListItem>
                             ))}
                             
                           </List>
                     

                      ) : (
              <h3>No Participants</h3>
            )}     


                     <button onClick={this.handleSubmit}>Send Email</button>
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




