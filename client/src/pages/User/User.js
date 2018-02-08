import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { List, ListItem } from "../../components/List";
import RedirectBtn from "../../components/RedirectBtn";
import axios from "axios";

class User extends Component {
  state = {
    name: "",
    surveys: {}
  };

componentDidMount() {
    this.loadSurveys();
  }

loadSurveys = () => {
    axios.get("/api/admin/" + sessionStorage.getItem("id"))
        .then((response) => {
            console.log(response);
            // this.setState({ surveys: res.data})
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
          <Col size="md-6">
            <img src="" />
            <h4>{this.state.name}</h4>
          </Col>
          <Col size="md-6">
            <button><Link to="/Form">
              Add New Survey</Link>
            </button>
          </Col>
        </Row>
        <Row>
          <Col size="md-12" />
          <h2>Active Surveys</h2>
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
            <h3>No Active Surveys</h3>
          )}
        </Row>
      </Container>
    );
  }
}

export default User;