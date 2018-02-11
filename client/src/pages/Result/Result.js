import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Col, Row, Container} from "../../components/Grid";
import axios from "axios"
import 'react-notifications/lib/notifications.css';

class Result extends Component {
 
  state = {

     name: "",
     finalChoice: "",
     choice: [],
     participant: [],
     emails: [],
     RoundResult:[],
     IndexMax: 0,
     numberOfRounds: 0, 
     numberOfChoices: 0,
     
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
    
          

    let NumberOfRounds = RoundResult.length;

    let LastRoundVote = RoundResult[NumberOfRounds-1];
    let Maximum = Math.max(...LastRoundVote);
    let IndexMax = LastRoundVote.indexOf(Maximum);
    
              this.setState({
                IndexMax: IndexMax,
                RoundResult:RoundResult,
                numberOfRounds: NumberOfRounds
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
        .then((response) => {
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
              let NumberOfChoices = resultSurvey.choice.length;
              let choice = [];
              let name = resultSurvey.name;
               for (let i = 0; i < resultSurvey.choice.length; i++) {

                  choice.push(resultSurvey.choice[i].toString());
              }
              this.setState({
                  choice: choice, 
                  name: name,
                  finalChoice: choice[this.state.IndexMax],
                  numberOfChoices: NumberOfChoices
              });
              console.log(this.state);
          })
          .catch(err => {
              console.log(err);
          })
};

  render(){
    return(
      
        <div>
          <Container>
              <Row>
                  <Col size="md-12">
                  <div className="section">
                         <h3> Decision:  {this.state.name} </h3>
                      </div>
                      <div className="section">
                        <h3> Maximized Group Choice: {this.state.finalChoice} </h3>
                      </div>
                    
                  </Col>
              </Row>
              <Row>
                <Col size = "md-12"> 
                
                    <div className="section">
                        <h4> Voting Results </h4>
                      </div>
               </Col>
       </Row>
<Row>
                <Col size = "md-12"> 
                 <table className="highlight">
                          <thead>
                            <tr>
                              <th> Options </th>

                             {this.state.RoundResult.map((RoundResult, j) => (
                                       
                                          <th> Round Result:  {j+1}      
                                              </th> 
                                        ))} 
                             </tr>
                             </thead>
                             <tbody>  
                              
                               {this.state.choice.map((choice, i)=>(
                                  <tr>  
                                <th> {this.state.choice[i]} </th>

                                        {this.state.RoundResult.map((RoundResult, j) => (
                                        <td>{this.state.RoundResult[j][i]}  </td>
                                      ))} 

                                 </tr> 
                                ))}

                             
                      </tbody>
                      </table>
             </Col>
       </Row> 
     
                <Row>
                 <Col size="md-12">
                     <div className="section">
                        <h4> Participants (by email) </h4>
                      </div>
                       <ul className="collection">

               
                            {this.state.emails.map((emails, i) => (
                               <li className = "collection-item">
                                {emails}                  
                              </li>
                            ))}
                    </ul>
                  </Col>
                   
                  </Row>
                <Row>
                  <button><Link to="/User" style={{ color: "black"}}> Back to User Page</Link></button> 
                </Row>  
            </Container>
        
        </div>
    
    );
  }
}
export default Result;