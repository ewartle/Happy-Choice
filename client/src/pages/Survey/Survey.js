import React, {Component} from "react";
//import API from "../../utils/API";
import {Link} from "react-router-dom";
import {List, ListItem} from "../../components/List"
import Alert from "../../components/Alert/Alert";
import {FormBtn, Input, Slider, TextArea} from "../../components/Form"
import { Col, Row, Container } from "../../components/Grid";

class Survey extends Component {
  
  state = {
   
     choice: [{ name:'US', votes:1 },
     { name:'China', votes:1 },
     { name:'Europe(ESA)', votes:1 },
     { name:'India', votes:1 },
     { name:'Japan', votes:1 }
     ]
     
  };

  componentDidMount() {
   // this.loadChoice();
    console.log("hello")
  }

 
  //var total = choice.reduce (function(preVal, elem) {
    //return preVal + elem.votes;}, 0);

//var slider = document.getElementById("myRange");
//var output = document.getElementById("demo");
//output.innerHTML = slider.value;

//slider.oninput = function() {
  //output.innerHTML = this.value;
//}


//loadChoices function --this function loads the choices submitted by the Admin.
 // loadChoice = () => {
 //  API.getChoices()
  //    .then(res =>
  //      this.setState({choice: res.data, name: ""})
  //    )
    //  .catch(err => console.log(err));
 //   };

// handleSlide = () => {
//   
//
//}



//var slider = document.getElementById("myRange");
//var output = document.getElementById("demo");
//output.innerHTML = slider.value;

//slider.oninput = function() {
  //output.innerHTML = this.value;
//}

  render(){
    return(
      <div>
        <Container fluid>
        <Container>
          <Row>
            <Col size="md-12">
            <h1> Decision Title </h1>
            <h4> Instructions </h4>
            <p> You have 100 points total that you can allocate to the following options.  To allocate, click on the ball and slide to the appropriate number.  Once you have designated your allocations, click the submit button.</p>
            </Col>
          </Row>
          <Row>
            <Col size = "md-12">  
              <List>
                {this.state.choice.map((choice, i) => (
                  <ListItem>
                      <strong>
                           Option {i+1}: {choice.name}
                      </strong>
                            
                      <Slider
                        onChange = {this.handleSlide}
                            
                      />
                      Value: <span id="demo">{choice.votes} </span> 
                     
                  </ListItem>
                ))}
                Total Points:
                      <div> 100 </div>
              </List>
              <FormBtn>Submit Survey</FormBtn>
              <br/>
              <Link to="/"> Back to User Page</Link> 
            </Col>
          </Row>  

          </Container>
        </Container>
      </div>
    );
  }

}
export default Survey;

