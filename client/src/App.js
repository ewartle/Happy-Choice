import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Survey from "./pages/Survey/Survey";
import Result from "./pages/Result/Result";
import Verify from "./pages/Verify/Verify";
import './App.css';


const App = () =>
  <Router>
    <div>
    
      <Switch>
        <Route exact path="/Survey" component={Survey} />
        <Route exact path="/Result" component={Result} />
        <Route exact path="/Verify" component={Verify} />   
        
      </Switch>
    </div>
  </Router>;


export default App;


