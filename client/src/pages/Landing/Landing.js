import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import { Link } from "react-router-dom";
import { Input, FormBtn } from "../../components/Form";
import axios from "axios";

class Landing extends Component {
//   state = {
//     name: "",
//     password: "",
//     email: ""
//   };

//   handleInputChange = event => {
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value
//     });
//   };

//   handleFormSubmit = event => {
//     event.preventDefault();
//     const payload = this.state;
//     axios.post("/api/admin", payload)
//         .then((response) => {
//             sessionStorage.setItem('id', response.data._id);
//             this.props.history.push("/User");
//         })
//         .catch(err => {
//             console.log(err.message);
//         })
// };

// handleAdminLogin = event => {
//   event.preventDefault();
//   axios.get("/api/admin/" + this.state.email)
//       .then((response) => {
//           if (response.data.password === this.state.password) {
//               sessionStorage.setItem('id', response.data._id);
//               this.props.history.push("/User");
//           } else {
//               console.log("Invalid password");
//           }
//       })
//       .catch(err => {
//           console.log(err.message);
//       })
// };

render() {
    return (
      <Container>
        <Row>
          <Col size="m12">
            <h1>Happy Choice App</h1>
            <h1>
              <span role="img">LOGO</span>
            </h1>
            <button className="btn">
              <Link to="/CreateAcct">Create Account</Link>
            </button>
            <button className="btn">
              <Link to="/SignIn">Sign In</Link>
            </button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Landing;
