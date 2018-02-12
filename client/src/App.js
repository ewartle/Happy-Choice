import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import CreateAcct from "./pages/Landing/CreateAcct";
import SignIn from "./pages/Landing/SignIn";
import Survey from "./pages/Survey/Survey";
import Result from "./pages/Result/Result";
import User from "./pages/User/User";
import Form from "./pages/Form/Form";
import Verify from "./pages/Verify/Verify";
import Information from "./pages/Information/Information";
import './App.css';
import Nav from "./components/Nav";


class App extends Component {

render() {
    return ( 
      <Router>
        <div>

      <Nav /> 
      <Switch>
      <Route exact path="/" component={Landing} />     
      <Route exact path="/form" component={Form} />   
      <Route exact path="/user" component={User} /> 
      <Route exact path="/survey" component={Survey} /> 
      <Route path="/result/:id" component={Result} /> 
      <Route path="/survey/:surveyid/:participantid" component={Survey} />
      <Route path="/verify/:id" component={Verify} />
      <Route exact path="/CreateAcct" component={CreateAcct} />     
      <Route exact path="/SignIn" component={SignIn} />
      <Route exact path="/Information" component={Information} /> 

 
       
        
     </Switch>
        </div> 
        </Router>
    );
};
}
export default App;