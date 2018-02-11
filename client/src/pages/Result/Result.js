import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Col, Row, Container} from "../../components/Grid";
import {Panel, Table} from "../../components/Table";
import Wrapper from "../../components/Wrapper";
import axios from "axios"
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


class Result extends Component {
  
  state = {

     admin: "Julie",
     name: "",
     finalChoice: "",
     choice: [],
     participant: [],
     emails: [],
     RoundResult:[],
     IndexMax: 0   
  };

 componentDidMount() {
  this.loadVotes();
  

}

  loadVotes = () => {
  axios.get('/api/survey/calculate/'+this.props.match.params.id).then ((response)=>{
    console.log(response.data)

    let RoundResult = []
    
    for (let i = 0; i <response.data.length; i++) {
      RoundResult.push(response.data[i]);
      
    }
    
    console.log(RoundResult);
    var numberOfRounds = RoundResult.length;
    var lastRoundVote = RoundResult[RoundResult.length-1];
    console.log (lastRoundVote);
    let Maximum = Math.max(...lastRoundVote);
    let IndexMax = lastRoundVote.indexOf(Maximum);
    console.log(IndexMax);
             
              this.setState({
                IndexMax: IndexMax,
                RoundResult:RoundResult
             });

             console.log(this.state); 
             this.loadInfo();
             this.loadEmails();
    })
    .catch(err => {
              console.log(err.message);
         })
    
 };

 loadEmails = () => {

 axios.get("/api/admin/results/" + this.props.match.params.id)
//    axios.get("/api/admin/results/5a7cfb19b4234c1b2c4ac1e7")
        .then((response) => {
          console.log(response);
            const result = response.data;
            let participant = [];
            let email = [];
           
            for (let i = 0; i < result.participant.length; i++) {
                participant.push(result.participant[i]._id);
            }
            for (let i=0; i<result.participant.length; i++) {
              email.push(result.participant[i].email);
            }
            this.setState({
                participant: participant,
                emails: email,
                
                
            });
            console.log(this.state);
        })
        .catch(err => {
            console.log(err.message);
        })
};


 loadInfo = () => {
      axios.get("/api/survey/" + this.props.match.params.id)
      //axios.get("/api/survey/5a7cfb19b4234c1b2c4ac1e7/calculate")
          .then((responseSurvey) => {
              
              const resultSurvey = responseSurvey.data;
              console.log(resultSurvey);
              let choice = [];
              let name = resultSurvey.name;
              console.log(resultSurvey.choice)

              for (let i = 0; i < resultSurvey.choice.length; i++) {

                  choice.push(resultSurvey.choice[i].toString());
              }
              console.log(choice);
             
            
              this.setState({
                  choice: choice, 
                  name: name,
                  finalChoice: choice[this.state.IndexMax],

                  
              });
              console.log(this.state);
          })
          .catch(err => {
              console.log(err);
          })
};

  render(){
    return(
      <Wrapper>
        <div>
          <Container fluid>
            <Container>
              <Row>
                  <Col size="md-12">
                    <Panel>
                        <h1> {this.state.name} </h1>
                        <h2> Maximized Group Decision: {this.state.finalChoice} </h2>
                        <br />
                        <h5> All possible options: </h5> 
                            {this.state.choice.map((choice, i) => (  
                                     <p> {this.state.choice[i]}</p>
                              ))}
                       
                    </Panel>
                  </Col>
              </Row>
              <Row>
                <Col size = "md-2"> 
                    <Panel> 
                        <Table>
                          <thead>
                               <tr><th scope="col">Options</th></tr>
                          </thead>
                          <tbody>
                             {this.state.choice.map((choice, i) => (  
                                     <tr><th> {this.state.choice[i]}</th></tr>
                              ))}
                          </tbody>
                        </Table> 
                    </Panel>
                  </Col>

                  <Col size = "md-2"> 
                    <Panel> 
                        <Table>
                          <thead>
                               <tr>
                                  <th scope="col">Round 1</th>
                                </tr>
                          </thead>
                          <tbody>
                             {this.state.RoundResult.map((RoundResult1, i) => (
                                  <tr><td>{this.state.RoundResult[i]}</td></tr>  
                            ))} 
                          </tbody>
                        </Table> 
                    </Panel>
                  </Col>

                  
                </Row>
                <Row>
                 <Col size="md-12">
                   <Panel>
                        <h5> Voters </h5>
                            {this.state.emails.map((emails, i) => (
                              <p> 
                                {emails}                  
                              </p>
                            ))}
                    </Panel>
                  </Col>
                   
                  </Row>
                <Row>
                  <button><Link to="/" style={{ color: "black"}}> Back to User Page</Link></button> 
                </Row>  
            </Container>
          </Container>
        </div>
      </Wrapper>
    );
  }
}
export default Result;

