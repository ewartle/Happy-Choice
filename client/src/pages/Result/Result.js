import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Col, Row, Container} from "../../components/Grid";
import {Panel, Table} from "../../components/Table";
import Wrapper from "../../components/Wrapper";
import axios from "axios"

class Result extends Component {
  
  state = {

     admin: "Julie",
     decision: "",
     finalChoice: "",
     choice: [],
     emails: [],
     RoundResult1: [],
     RoundResult2: [],
     RoundResult3: [],
     IndexMax: 0   
  };

 componentDidMount() {
  this.loadVotes();
  

}




  loadVotes = () => {
  axios.get('/surveys/5a7cfb19b4234c1b2c4ac1e7/calculate').then ((response)=>{
    console.log(response.data)
    let RoundResult1 = response.data[0];
    let RoundResult2 = response.data[1];
    let RoundResult3=response.data[2];
    let Maximum = Math.max(...response.data[2]);
    console.log(Maximum);
    let IndexMax = response.data[2].indexOf(Maximum);


              for (let i = 0; i <RoundResult1.length; i++) {
                RoundResult1[i] = RoundResult1[i].toFixed(0)
              }

              for (let i = 0; i <RoundResult2.length; i++) {
                RoundResult2[i] = RoundResult2[i].toFixed(0)
              }

              for (let i = 0; i <RoundResult3.length; i++) {
                RoundResult3[i] = RoundResult3[i].toFixed(0)
              }
      
             
              this.setState({
                RoundResult1: RoundResult1,
                RoundResult2: RoundResult2,
                RoundResult3: RoundResult3, 
                IndexMax: IndexMax
             });

             console.log(this.state); 
             this.loadResults();
    })
    .catch(err => {
              console.log(err.message);
         })
    
 };

 loadResults = () => {
      //axios.get("/api/survey/" + this.props.match.params.id)
      axios.get("/api/survey/5a7cfb19b4234c1b2c4ac1e7")
          .then((responseSurvey) => {
            console.log(responseSurvey);
              const resultSurvey = responseSurvey.data;
              let choice = [];
              let participant = [];
              let name = resultSurvey.name;
              let IndexMax = `${this.state.IndexMax}`
              console.log(IndexMax);

              for (let i = 0; i < resultSurvey.choice.length; i++) {

                  choice.push(resultSurvey.choice[i].toString());
              }
            for (let i = 0; i < resultSurvey.participants.length; i++) {
               participant.push(resultSurvey.participants[i].name);
             }
              this.setState({
                  choice: choice,
                  emails: participant,
                  name: name,
                  finalChoice: choice[IndexMax],
                  
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
                             {this.state.RoundResult1.map((RoundResult1, i) => (
                                  <tr><td>{this.state.RoundResult1[i]}</td></tr>  
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
                                  <th scope="col">Round 2</th>
                                </tr>
                          </thead>
                          <tbody>
                             {this.state.RoundResult2.map((RoundResult2, i) => (
                                  <tr><td>{this.state.RoundResult2[i]}</td></tr>  
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
                                  <th scope="col">Round 3</th>
                                </tr>
                          </thead>
                          <tbody>
                             {this.state.RoundResult3.map((RoundResult3, i) => (
                                <tr ><td>{this.state.RoundResult3[i]}</td></tr>     
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

