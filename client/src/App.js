import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Survey from "./pages/Survey/Survey";
import Result from "./pages/Result/Result";
import NodeMailer from "./pages/NodeMailer/NodeMailer"

import './App.css';


const App = () =>
  <Router>
    <div>
    
      <Switch>
        <Route exact path="/Survey" component={Survey} />
        <Route exact path="/Result" component={Result} />
           <Route exact path="/NodeMailer" component={NodeMailer} />

        
      </Switch>
    </div>
  </Router>;


export default App;


