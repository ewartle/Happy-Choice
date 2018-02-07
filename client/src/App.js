import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Form from "./pages/Form/Form";
import User from "./pages/User/User";
import Survey from "./pages/Survey/Survey";
import Landing from "./pages/Landing/Landing";
import API from "./utils/API";
import './App.css';


class App extends Component {


handleFormSubmit = event => {
    event.preventDefault();
    console.log(document.getElementById("password").value);
    if (document.getElementById("username").value && document.getElementById("password").value) {
        API.saveAdmin({
                name: document.getElementById("username").value,
                email: document.getElementById("adminEmail").value,
                password: document.getElementById("password").value
            })
            .then(res => {
                sessionStorage.setItem('id', res.data._id)
            })
            .catch(err => console.log(err));
    }
};


loginAdmin = event => {
    event.preventDefault();
    if (document.getElementById("adminEmail").value && document.getElementById("password").value) {
        API.getAdmin(document.getElementById("adminEmail").value)
            .then(res => {
                if (document.getElementById("password").value === res.data.password) {
                sessionStorage.setItem('id', res.data._id)
            } else {
                console.log("Password Incorrect");
            }
            })

            .catch(err => console.log(err));
    }
};

render() {
    return ( 
      <Router>
        <div>

       
         <Switch>
       <Route exact path="/" component={Landing} />     
       <Route exact path="/Form" component={Form} />   
        <Route exact path="/User" component={User} /> 
         <Route exact path="/Survey" component={Survey} /> 
       
        
     </Switch>
        </div> 
        </Router>
    );
};
}
export default App;