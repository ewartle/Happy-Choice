import axios from "axios";


export default {
saveAdmin: function(adminData) {
return axios.post("api/admin", adminData);
},
getAdmin: function(email) {
return axios.get("/api/admin/"+email);
}

//Gets all surveys
// getSurveys: function() {
// 	return axios.get("/api/survey");
// },
// //Get a survey by Id
// getSurvey: function() {
// 	return axios.get("/api/survey/"+id);
// },
// //Saves a survey to the database
// saveSurvey: function(surveyData) {
// 	return axios.post("api/survey", surveyData);
// }

};
// export default {
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
//   // Saves a book to the database
//   saveBook: function(bookData) {
//     return axios.post("/api/books", bookData);
//   }
// };
