import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Form from "./pages/Form/Form";
import User from "./pages/User/User";
import Survey from "./pages/Survey/Survey";
import Result from "./pages/Result/Result";
import Landing from "./pages/Landing/Landing";
import Verify from "./pages/Verify/Verify";
import './App.css';


class App extends Component {

render() {
    return ( 
      <Router>
        <div>

       
      <Switch>
      <Route exact path="/" component={Landing} />     
      <Route exact path="/form" component={Form} />   
      <Route exact path="/user" component={User} /> 
      <Route exact path="/survey" component={Survey} /> 
      <Route path="/result/:id" component={Result} /> 
      <Route path="/survey/:surveyid/:participantid" component={Survey} />
      <Route path="/verify/:id" component={Verify} />
 
       
        
     </Switch>
        </div> 
        </Router>
    );
};
}

export default App;