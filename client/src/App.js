import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Survey from "./pages/Survey/Survey";
import Form from "./pages/Form/Form";
import './App.css';


const App = () =>
 <Router>
   <div>
   
     <Switch>
       <Route exact path="/Survey" component={Survey} />
       <Route exact path="/Form" component={Form} />
     
     </Switch>
   </div>
 </Router>;


export default App;