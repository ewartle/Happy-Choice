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


const App = () =>
 <Router>
   <div>
   <Nav />
     <Switch>
       <Route exact path="/" component={Landing} />     
        <Route exact path="/Survey" component={Survey} />
        <Route exact path="/Result" component={Result} />

       <Route exact path="/User" component={User} />
       <Route exact path="/Form" component={Form} />     
       <Route exact path="/Verify" component={Verify} />     
     </Switch>
   </div>
 </Router>;


export default App;