import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import { Link } from "react-router-dom";
import { List, ListItem } from "../../components/List";
import axios from "axios";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surveys: {},
      admin: ""
      };
  }
  
componentDidMount() {
    this.loadSurveys();
  }

loadSurveys = () => {
    axios.get("/api/admin/adminpage/"+ sessionStorage.getItem("id"))
        .then((response) => {
            this.setState({ surveys: response.data.surveys, admin: sessionStorage.getItem("name")})
        })
        .catch(err => {
            console.log(err.message);
        })
    
};

//For Future Development
// closeSurvey = id => {
 // axios.post("type route here")
 //  .then(res => this.loadSurveys())
 //  .catch(err => console.log(err));
//};

  render() {
    return (
      <Container>
        <Row>

          <Col size="m12">
            <img src="/sun.png" alt="avatar default"/>
            <h4>{this.state.name}</h4>
          </Col>
          </Row>
          <div className="divider"></div>
          <Row>
          <Col size="m12">
            <button className="btn"><Link to="/Form">
              Add New Survey</Link>
            </button>

          </Col>
        </Row>
        
        <div className="section">
        <Row>
          <Col size="m6">
          <h3>{this.state.admin}'s Surveys    <button className="btn"><Link to="/Form">
              Add New Survey</Link>
            </button></h3>
          {this.state.surveys.length ? (
            <List>
              {this.state.surveys.map(survey => (
                <ListItem key={survey._id}>
                  <Link to={"/Result/" + survey._id}>
                    <strong>
                      {survey.name}
                    </strong>
                  </Link>
                 {/* <button onClick={() => this.closeSurvey(survey._id)}>Close</button>*/}
                </ListItem>
              ))}
            </List>
          ) : (
            <strong>No Active Surveys</strong>
          )}
          </Col>
          <Col size = "m6">

 
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title">Welcome {this.state.admin}! </span>
              <p>On this page you can find all of your active surveys.  Click to see the results.  Do you have a new decision you want your group to make?  Click the "New Survey" button, add the information about your decision and your group member's emails and press send.  Your group's maximized happiness is just a click away!</p>
            </div>
            
          </div>

          </Col>

        </Row>
        </div>
        
      </Container>
    );
  }
}

export default User;

//Future Development:  Add button to allow surveys to display as active and closed

//<div className="divider"></div>
 //       <div className="section">
//        <Row>
//          <Col size="m12" />
//          <h3>Closed Surveys</h3>
//          {this.state.surveys.length ? (
//            <List>
//              {this.state.surveys.map(survey => (
//                <ListItem key={survey._id}>
//                  <Link to={"/Result/" + survey._id}>
//                    <strong>
//                      {survey.name}
//                    </strong>
//                  </Link>
//                </ListItem>
//              ))}
//            </List>
 //         ) : (
//            <strong>No Closed Surveys</strong>
//          )}
//        </Row>
//        </div>