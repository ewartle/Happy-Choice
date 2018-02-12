import axios from "axios";


export default {
//Creates an Admin
saveAdmin: function(adminData) {
return axios.post("api/admin", adminData);
},
//Gets an Admin for Login
getAdmin: function(email) {
return axios.get("/api/admin/"+email);
},
//Gets all surveys for a particular Admin
getSurveys: function() {
	return axios.get("/api/admin/survey");
},
// //Gets a survey by Survey Id
getSurvey: function(id) {
	return axios.get("/api/survey/"+id);
},
// //Saves a survey to the database
saveSurvey: function(surveyData) {
	return axios.post("api/survey", surveyData);
}

};
