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
        
          <Col size="m6">
          <div id = "surveyContainer">
            <h3>Your Surveys  </h3>
               <button className="btn"><Link to="/Form"> Add New Survey</Link></button>
              <div id="surveys">
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
              </div>
            </div>
          </Col>
       <Col size = "m6">
          <div class="card grey lighten-2" id="welcomeCard">
            <div class="card-content black-text">
              <span class="card-title">Welcome {this.state.admin}! </span>
              <p>On this page you can find all of your active surveys. Click to see the results.</p>  
              <br/>
              <p>If you have a new decision you want your group to make, click the "New Survey" button and add the required information.  Your group's maximized happiness is just a click away!</p>
              
            </div>
          </div>

          </Col>

       
        </Row>
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