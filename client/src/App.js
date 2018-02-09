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
      <Route exact path="/Form" component={Form} />   
      <Route exact path="/User" component={User} /> 
      <Route exact path="/Survey" component={Survey} /> 
      <Route path="/Result/" component={Result} /> 
      <Route path="/Survey/:id" component={Survey} />
      <Route path="/Verify/" component={Verify} />
 
       
        
     </Switch>
        </div> 
        </Router>
    );
};
}
export default App;