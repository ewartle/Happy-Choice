import React, {Component} from "react";
import {Link} from "react-router-dom";
import {List, ListItem} from "../../components/List"
import {FormBtn, Input, Slider, TextArea} from "../../components/Form"
import { Col, Row, Container } from "../../components/Grid";
import { Panel, Table, TableHead, TableBody } from "../../components/Table";
import Wrapper from "../../components/Wrapper";
import axios from "axios";

class Result extends Component {
  
  state = {

     name: "",
     decription: "",
     finalChoice: "",
     choice: [],
     emails: []
  };

  componentDidMount() {
   this.loadChoice();
  }

// loadChoice function --this function loads the choices submitted by the Admin.
 loadChoice = () => {
    console.log(this.props);
    axios.get("/api/admin/results/" + this.props.match.params.id)
        .then((response) => {
          console.log(response);
            const result = response.data;
            let choice = [];
            let participant = [];
            let name = result.name;
            let description = result.description;
            for (let i = 0; i < result.choice.length; i++) {

                choice.push(result.choice[i].toString());
            }
            for (let i = 0; i < result.participant.length; i++) {
                participant.push(result.participant[i].toString());
            }
            this.setState({
                choice: choice,
                emails: participant,
                name: name,
                description: description
            });
            console.log(this.state);
        })
        .catch(err => {
            console.log(err.message);
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
                        <h4> {this.state.description}</h4>
                        <h2> Maximized Group Decision: {this.state.finalChoice} </h2>
                    </Panel>
                    <Panel>
                        <h5> Voters </h5>
                        <List>
                            {this.state.emails.map((emails, i) => (
                              <ListItem>
                                {emails}                  
                              </ListItem>
                            ))}
                        </List>
                    </Panel>
                  </Col>
              </Row>
              <Row>
                  <Col size = "md-12"> 
                    <Panel> 
                      <Table>
                        <TableHead> </TableHead>
                        {this.state.choice.map((choice, i) => (
                          <TableBody>
                              <tr>
                                  <td> {i+1}</td>
                                  <td> {choice} </td>
                                  <td> {choice.vote1}</td>
                                  <td> {choice.vote2}</td>
                                  <td> {choice.vote3} </td>   
                              </tr>
                          </TableBody>
                        ))}
                      </Table>
                    </Panel>
                    <FormBtn><Link to="/user" style={{ color: "black"}} > Back to User Page</Link></FormBtn> 
                  </Col>
                </Row>  
            </Container>
          </Container>
        </div>
      </Wrapper>
    );
  }
}
export default Result;