import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Survey from "./pages/Survey/Survey";

import './App.css';


const App = () =>
  <Router>
    <div>
    
      <Switch>
        <Route exact path="/Survey" component={Survey} />
        
      </Switch>
    </div>
  </Router>;


export default App;


