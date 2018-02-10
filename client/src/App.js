import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Survey from "./pages/Survey/Survey";
import Result from "./pages/Result/Result";
import User from "./pages/User/User";
import Form from "./pages/Form/Form";
import Verify from "./pages/Verify/Verify";
import './App.css';
import Nav from "./components/Nav";


class App extends Component {

render() {
    return ( 
      <Router>
        <div>

       
      <Switch>
      <Route exact path="/" component={Landing} />     
      <Route exact path="/Form" component={Form} />   
      <Route exact path="/User" component={User} /> 
      <Route exact path="/Survey" component={Survey} /> 
      <Route path="/Result/:id" component={Result} /> 
      <Route path="/Survey/:id" component={Survey} />
      <Route path="/Verify/:id" component={Verify} />
 
       
        
     </Switch>
        </div> 
        </Router>
    );
};
}
export default App;