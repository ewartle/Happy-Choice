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
     choice: ["US", "China", "England", "Russia"],
     emails: ["ewartle@yahoo.com", "ewartle@gmail.com", "smartgroupdecision@gmail.com"],
     RoundResultsHistory: [ [5, 10, 15, 20], [25, 30, 16, 0], [50, 50, 0, 0], [90, 10, 0, 0]]
  };

  componentDidMount() {
  // this.loadChoice();
    console.log("hello")
  }

 // loadChoice = () => {
 //  axios.get("/api/admin/adminpage/"+ sessionStorage.getItem("id"))
 //      .then((response) => {
 //          console.log(response);
 //          this.setState({ surveys: response.data.surveys})
 //      })
 //      .catch(err => {
 //          console.log(err.message);
 //      })
// };


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
                        <TableHead>

               

                         </TableHead>
                        {this.state.choice.map((choice, i) => (
                          <TableBody>
                              <tr>
                                  <td> {i+1}</td>
                                  <td> {choice} </td>
                                  <td> 1</td>
                                  <td> 2</td>
                                  <td> 3 </td>   
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

