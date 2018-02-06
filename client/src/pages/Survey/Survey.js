import React, {Component} from "react";
//import API from "../../utils/API";
import {Link} from "react-router-dom";
import {List, ListItem} from "../../components/List"
import Alert from "../../components/Alert/Alert";
import {FormBtn, Input, Slider, TextArea} from "../../components/Form"

class Survey extends Component {
  
  state = {
    choices: [
      {
        title: "Disney World",
        votes: 0
      }, 
      {
        title: "Disney World",
        votes: 0 
      }, 
      {
        title: "Disney World",
        votes: 0
      }, 
      {
        title: "Disney World",
        votes: 0
      }, 
      {
        title: "Barcelona",
        votes: 0
      }] 
  };

  componentDidMount() {
    //this.loadChoices();
    console.log("hello")
  }

//var slider = document.getElementById("myRange");
//var output = document.getElementById("demo");
//output.innerHTML = slider.value;

//slider.oninput = function() {
  //output.innerHTML = this.value;
//}



//  loadChoices = () => {
//    API.getChoices()
//    .then(res =>
//      this.setState({choices: res.data})
//    )
//    .catch(err => console.log(err));
//  };

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
      <div>
          <div>
            <h1> Instructions go here </h1>
          </div>
      
               
          <Alert style={{ opacity: this.state.match ? 1 : 0 }} type="success">
              Your Results were successfully submitted
          </Alert>

          <Alert style={{ opacity: this.state.match ? 1 : 0 }} type="success">
              Your survey was successfully created.
          </Alert>
      </div>
     
       <List>
          {this.state.choices.map((choice, i) => (
          <ListItem key={choice._id}>
              <strong>
                {choice.title}                 
              </strong>

              <Input
                min = {1}
                max = {100}
                value = {choice.votes}
                onChange = {this.handleSlide}
                //type: "range" 
                //name: "slide"
              />
              
         </ListItem>


        ))}
     </List>

     <Link to="/">← Back to User Page</Link> 

</div>
    );
  }


}
export default Survey;

