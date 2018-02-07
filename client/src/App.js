import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Form from "./pages/Form/Form";
import API from "./utils/API";
import './App.css';


class App extends Component {


handleFormSubmit = event => {
    event.preventDefault();
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

// const adminId = sessionStorage.getItem("id");
// console.log(adminId);

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

        <input className = "form-control"
        id = "adminName"
        placeholder = "name" / >
        <input className = "form-control"
        id = "adminEmail"
        placeholder = "email" / >
        <input className = "form-control"
        id = "adminPassword"
        placeholder = "password" / >
        <button onClick = { this.loginAdmin } >
        Submit </button>


        <Route exact path = "/form" component = { Form } /> 
        </div> 
        </Router>
    );
};
}
export default App;