import React, {Component} from "react";
import {Link} from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import axios from "axios";
import 'react-notifications/lib/notifications.css';

class Result extends Component {
  
 state = {
     name: "",
     finalChoice: "",
     choice: [],
     participant: [],
     emails: [],
     RoundResult: [],
     MaxScore: 0,
     numberOfRounds: 0, 
     numberOfChoices: 0,
     LastRoundVote: [],
     WinnersIndex: [],
     numberOfScores: 0, 
     winnersCount: 0,
     finalChoiceLanguage: ""
  };

 componentDidMount() {
  this.loadVotes();
  
}

  loadVotes = () => {
      axios.get('/api/survey/calculate/' + this.props.match.params.id).then((response) => {
              console.log(response.data);
              //let RoundResult = [[1, 3, 5, 2], [6, 6, 6, 8], [9, 9, 7, 8]];
             let RoundResult = [];
             for (let i = 0; i < response.data.length; i++) {
                  RoundResult.push(response.data[i]);
             }
              let maxScore = 0;
              let NumberofRounds = RoundResult.length;
              let NumberofScores=RoundResult[0].length;
              let LastRoundVote = RoundResult[NumberofRounds - 1];
              let winners_ct=0;
              let winners = [];
            

             //determines the maximum score in the last round
              for (let i=0; i<NumberofScores; i++) {
                if (LastRoundVote[i]>maxScore) {
                    maxScore = LastRoundVote[i]; 
                    let maxScoreIndex = i;
                };
              };
              //loops through the last round to see if more than one score matches the maximum
              for (var i=0; i<NumberofScores; i++) {
                  if (LastRoundVote[i]===maxScore) {
                  winners.push(i);
                  winners_ct++;
                }
              }
         
              for (let i=0; i<NumberofRounds; i++) {
                 for (let j = 0; j<NumberofScores; j++) {
                  RoundResult[i][j]=RoundResult[i][j].toFixed(2);
                }

              };
              this.setState({
                  RoundResult: RoundResult,
                  numberOfRounds: NumberofRounds,
                  LastRoundVote: LastRoundVote,
                  WinnersIndex: winners,
                  MaxScore: maxScore,
                  numberOfScores: NumberofScores,
                  winnersCount: winners_ct
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
              for (let i = 0; i < result.participant.length; i++) {
                  email.push(result.participant[i].email);
              }
              this.setState({
                  participant: participant,
                  emails: email
              });

          })
          .catch(err => {
              console.log(err.message);
          })
  };

 loadInfo = () => {
     axios.get("/api/survey/" + this.props.match.params.id)

         .then((responseSurvey) => {
          console.log(responseSurvey);
             const resultSurvey = responseSurvey.data;
             let NumberOfChoices = resultSurvey.choice.length;
             let choice = [];
             let name = resultSurvey.name;
             let finalChoiceLanguage = "";
             let finalChoice = "";
             let finalChoice1 = "";
             let and = "";
             for (let i = 0; i < resultSurvey.choice.length; i++) {
                 choice.push(resultSurvey.choice[i].toString());
             }
          if (this.state.winnersCount === 1){
              finalChoice = choice[this.state.WinnersIndex]
            } 
          else if (this.state.winnersCount === 2) {
              finalChoice = choice[this.state.WinnersIndex[1]]; 
              finalChoice1 = choice[this.state.WinnersIndex[0]]
              and = "and"
            }
           
          this.setState({
                 choice: choice,
                 name: name,
                 finalChoice: finalChoice,
                 numberOfChoices: NumberOfChoices,
                 finalChoice1: finalChoice1,
                 and: and
                
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
               <Col size="m5">
                     <img src="/sun.png" alt="avatar default"/>
                </Col>
                <Col size="m7">
                    <br/>
                    <br/>
                      <h5> Decision:  {this.state.name} </h5>
                      <h5> Participants (by email): </h5>
                          <ul>
                              {this.state.emails.map((emails, i) => (
                                  <li> {emails}  </li>
                              ))}
                          </ul>
                           
                </Col>
         
        </Row>
         
        <Row>
              <div className="divider"></div> 
            <Col size = "m12"> 
               <h3 className = "center-align"> <i className="large material-icons" >check</i> Your Group's Happy Choice: </h3>
               <h1 className = "final center-align">{this.state.finalChoice} {this.state.and} {this.state.finalChoice1} </h1>
                     
                     
             <h3 className = "center-align"> Voting Results</h3>
            
            <table className="highlight table1">
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
                <button><Link to="/User"> Back to User Page</Link></button> 
         </Row>  
       </Container>
      </div>
    );
  }
}
export default Result;
