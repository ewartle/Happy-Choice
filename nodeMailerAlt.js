import React, {Component} from "react";
//import API from "../../utils/API";
import {Link} from "react-router-dom";
import {List, ListItem} from "../../components/List"
import { Col, Row, Container } from "../../components/Grid";
import Wrapper from "../../components/Wrapper";
import axios from "axios"


class NodeMailer extends Component {
   
   state = {

     admin: "Julie",
     decision: "Family Vacation",
     originalLink: "www.google.com",
     recipients: [
     { link: "www.google.com", email:"ewartle@hotmail.com" },
     { link: "www.cnn.com", email:"ewartle@yahoo.com" },
     { link: "www.bbc.com", email:"ewartle@gmail.com" }
     
     ]
     
  };

  componentDidMount() {
   //this.loadChoice();
    console.log("hello")
  }

 //loadChoice function --this function loads the choices submitted by the Admin.
  //loadChoice = (event) => {
 //
    //  axios.get("/api/admin/admin/").then(res=>
    //    this.setState({               })
        
     //   console.log(res)
     // )  
  //   .catch(err=> {
  //    console.log(err.message);
 //   });



  handleSubmit= event => {

    event.preventDefault();
    const payload = this.state
    console.log(payload);
   // axios.post("/send", payload).then((response)=>{
    //console.log(response)}).catch((err)=> {
    //console.log(err);
    //});


    alert(`Thank you ${this.state.admin}.  Your survey has been emailed.`);
   
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
        <Container fluid>
        <Container>
          <Row>
            <Col size="md-12">
            <h1> {this.state.decision} </h1>
           
            </Col>
          </Row>

            <Row>
                  <Col size = "md-12">  
                  <div>
                          <List>

                          
                             {this.state.recipients.map((recipients, i) => (

                               <ListItem key={this.state.recipients._id}>
                                 <div>
                                      Link: {recipients.link}
                                 </div>
                                 <div>
                  					  Email:  {recipients.email}
                  			     </div>
                  			     <div>
 								 <button onClick={this.handleSubmit}>Send Email</button>
 								 </div>	
 								</ListItem>
                            ))}
                            
                          </List>
                    </div>
                   
                    <br/>
                    <br/>
                    <button><Link to="/" style={{ color: "black"}} > Back to User Page</Link></button> 
                        
                  </Col>
              </Row>  

          
          </Container>
        </Container>
      </div>
      </Wrapper>
    );
  }

}
export default NodeMailer;



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
                        <div>
                          <List>

                             {this.state.recipients.map((recipients, i) => (
                               <ListItem key={this.state.participants._id}>
                                 <div>
                                    Link: {link}
                                 </div>
                                 <div>
                                    Email:  {participants.email}
                                </div>
                              <div>
                                    <button onClick={this.handleSubmit}>Send Email</button>
                              </div>  
                        </ListItem>
                            ))}
                            
                          </List>
                    </div>
                     
                      ) : (
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

 this is the server.js alt nodemailer stuff
 const emailList = [];

for (let i = 0; i<req.body.emails.length; i++) {
        emailList.push(req.body.emails[i].email);
    }

const recipients = emailList.toString();
console.log(recipients);