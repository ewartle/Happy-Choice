import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import { Link } from "react-router-dom";
import { List, ListItem } from "../../components/List";
import axios from "axios";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surveys: {}
      };
  }
  
componentDidMount() {
    this.loadSurveys();
  }

loadSurveys = () => {
    axios.get("/api/admin/adminpage/"+ sessionStorage.getItem("id"))
        .then((response) => {
            this.setState({ surveys: response.data.surveys})
        })
        .catch(err => {
            console.log(err.message);
        })
};

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="m6">
            <img src="/sun.png" alt="avatar default"/>
            <h4>{this.state.name}</h4>
          </Col>
          <Col size="m6">
            <button className="btn"><Link to="/Form">
              Add New Survey</Link>
            </button>
          </Col>
        </Row>
        <div className="divider"></div>
        <div className="section">
        <Row>
          <Col size="m12" />
          <h3>Active Surveys</h3>
          {this.state.surveys.length ? (
            <List>
              {this.state.surveys.map(survey => (
                <ListItem key={survey._id}>
                  <Link to={"/Result/" + survey._id}>
                    <strong>
                      {survey.name}
                    </strong>
                  </Link>
                </ListItem>
              ))}
            </List>
          ) : (
            <strong>No Active Surveys</strong>
          )}
        </Row>
        </div>
        <div className="divider"></div>
        <div className="section">
        <Row>
          <Col size="m12" />
          <h3>Closed Surveys</h3>
          {this.state.surveys.length ? (
            <List>
              {this.state.surveys.map(survey => (
                <ListItem key={survey._id}>
                  <Link to={"/Result/" + survey._id}>
                    <strong>
                      {survey.name}
                    </strong>
                  </Link>
                </ListItem>
              ))}
            </List>
          ) : (
            <strong>No Closed Surveys</strong>
          )}
        </Row>
        </div>
      </Container>
    );
  }
}

export default User;
