 import axios from "axios";

 export default {
//   // Gets all books
//   getBooks: function() {
//     return axios.get("/api/books");
//   },
//   // Gets the book with the given id
//   getBook: function(id) {
//     return axios.get("/api/books/" + id);
//   },
//   // Deletes the book with the given id
//   deleteBook: function(id) {
//     return axios.delete("/api/books/" + id);
//   },
   // Saves new survey form data to the database
   saveUser: function(userData) {
    return axios.post("/api/user", userData);
  },

  // Saves new survey form data to the database
   saveForm: function(formData) {
     return axios.post("/api/form", formData);
   },
   // Get survey
   getSurvey: function() {
     return axios.get("/api/survey");
   },
   // Send survey data to email
   sendEmail: function() {
    return axios.post("/api/email");
  }
};
