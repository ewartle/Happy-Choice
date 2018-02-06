import axios from "axios";


export default {
saveAdmin: function(adminData) {
	return axios.post("api/admins", adminData);
},
//Gets all surveys
getSurveys: function() {
	return axios.get("/api/surveys");
},
//Get a survey by Id
getSurvey: function() {
	return axios.get("/api/surveys/"+id);
},
//Saves a survey to the database
saveSurvey: function(surveyData) {
	return axios.post("api/surveys", surveyData);
}

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
