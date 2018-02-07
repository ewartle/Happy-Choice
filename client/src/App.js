import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Survey from "./pages/Survey/Survey";
import User from "./pages/User/User";
import Form from "./pages/Form/Form";
import './App.css';


const App = () =>
 <Router>
   <div>
   
     <Switch>
       <Route exact path="/" component={Landing} />     
       <Route exact path="/Survey" component={Survey} />
       <Route exact path="/User" component={User} />
       <Route exact path="/Form" component={Form} />     
     </Switch>
   </div>
 </Router>;


export default App;