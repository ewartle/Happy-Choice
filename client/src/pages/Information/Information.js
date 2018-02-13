import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import { Link, withRouter } from "react-router-dom";

class Information extends Component {
    state = {};


render() {
    return (
      <Container>
        <Row>
          <Col size="m12">
            <h3>Overview</h3>
            <div className="divider"></div>
            <h4>Happy Choice...</h4>
            <ul> 
            <li>* Can maximizes total satisfaction over groups through instant runoff voting.</li>
            <li>* Can handle many options.</li>
            <li>* Allows participants to express not only their preference order, but also their degree of satisfaction with each option.</li>
            <li>* Everyone may have a say in each round.</li>
            <li>* Points are reallocated proportionately in each round -not lost if a participant’s option is eliminated.</li>
            <li>* Points are only lost if the voter scores all the remaining choices with a zero.</li>
            <li>* Instantaneous with a computer (no need for multiple rounds of voting)</li>
            </ul>
            <h4>Example</h4>
            <div className="divider"></div>
            <h5>Define the decision, set up choices then invite voters to complete a survey via email.</h5>
            <ul>Where shall the family go on vacation?
            <li>* Johnny wants to go to Legoland</li>
            <li>* Jenny wants to go to Disney World</li>
            <li>* Mom wants to go to Sanibel Island</li>
            <li>* Dad wants to go to Clearwater</li>
            </ul>
            <h5>Each group member allocates points to their favorite options. Voting points must add up to 100.</h5>
            <ul>
            <li>* Johnny allocates 70 points to Legoland and 30 points to Disney World</li>
            <li>* Jenny allocates 20 points to Legoland, 70 points to Disney World, and 10 points to Sanibel Island</li>
            <li>* Mom allocates 10 points to Disney World, 50 points to Sanibel Island, and 40 points to Clearwater</li>
            <li>* Dad allocates 15 points to Legoland, 15 points to Disney World, 10 points to Sanibel Island, and 60 points to Clearwater</li>
            </ul>
            <h5>Round 1 votes are counted</h5>
            <p>Sanibel has fewest votes and will be eliminated. Votes cast for Sanibel will be redistributed proportionately over other options favored by the individual participant. Clearwater has a slight edge over Disney.</p>
            <p><img src="/R1-graph.png" alt="round 1 graph of votes" width="90%" /></p>
            <h5>Round 2 runoff votes are counted without Sanibel</h5>
            <p>Legoland now has the fewest votes and will be eliminated. Legoland votes are redistributed over other options favored by the individual participants. Clearwater now has a strong edge over Disney World.</p>
            <p><img src="/R2-graph.png" alt="round 2 graph of votes" width="90%" /></p>
            <h5>Round 3 runoff votes are counted without Sanibel or Legoland</h5>
            <p>Disney World is the clear best compromise for a vacation.</p>
            <p><img src="/R3-graph.png" alt="round 3 graph of votes" width="90%" /></p>
          <button onClick={e => {
                  e.preventDefault();
                  this.props.history.goBack()
                }}>Back</button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Information;
