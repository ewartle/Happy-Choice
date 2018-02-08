import React, {Component} from "react";
import {Link} from "react-router-dom";
import {List, ListItem} from "../../components/List"
import { Col, Row, Container } from "../../components/Grid";
import { Panel, Table, TableHead, TableBody } from "../../components/Table";
import Wrapper from "../../components/Wrapper";

class Result extends Component {
  
  state = {

     admin: "Julie",
     decision: "Family Vacation",
     finalChoice: "China",
     choice: [{ name:'US', vote1:"1", vote2:"2", vote3:"3" },
     { name:'Europe(ESA)', vote1:"", vote2:"", vote3:""  },
     { name:'India', vote1:"", vote2:"", vote3:"" },
     { name:'Japan', vote1:"", vote2:"", vote3:"" }
     ],
     emails: [{name:"Lisa", email: "ewartle@yahoo.com"},
     {name: "Elizabeth", email: "ewartle@gmail.com"}, 
     { name: "group", email: "smartgroupdecision@gmail.com"}]
  };

  componentDidMount() {
   // this.loadChoice();
    console.log("hello")
  }

//loadChoice function --this function loads the choices submitted by the Admin.
 // loadChoice = () => {
 //  API.getChoices()
  //    .then(res =>
  //      this.setState({choice: res.data, name: ""})
  //    )
    //  .catch(err => console.log(err));
 //   };


  render(){
    return(
      <Wrapper>
        <div>
          <Container fluid>
            <Container>
              <Row>
                  <Col size="md-12">
                    <Panel>
                        <h1> {this.state.decision} </h1>
                        <h2> Maximized Group Decision: {this.state.finalChoice} </h2>
                    </Panel>
                    <Panel>
                        <h5> Voters </h5>
                        <List>
                            {this.state.emails.map((emails, i) => (
                              <ListItem>
                                {emails.name}                  
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
                                  <td> {choice.name} </td>
                                  <td> {choice.vote1}</td>
                                  <td> {choice.vote2}</td>
                                  <td> {choice.vote3} </td>   
                              </tr>
                          </TableBody>
                        ))}
                      </Table>
                    </Panel>
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
export default Result;

