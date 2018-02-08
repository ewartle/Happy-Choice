const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const calculateSurveyResults = require('./algorithm-code.js')
const { Admin, Survey, Choice, Participant } = require('./models/database.js');


mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/happy-choice");

const connection = mongoose.connection;
connection.on('connected', () => {
  console.log('Mongoose Connected Successfully');    
}); 

// If the connection throws an error
connection.on('error', (err) => {  
  console.log('Mongoose default connection error: ' + err);
}); 

app.use(bodyParser.json());

app.use(express.static(__dirname + '/client/build/'));
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/client/build/index.html')
})

app.get('/surveys/:surveyId/calculate', (req, res) => {
  console.log("You hit the calculate route");
  Survey.findById(req.params.surveyId)
    .then((survey) => {
      let surveyResults = calculateSurveyResults( survey.toObject() );
      console.log(surveyResults);    
      res.json(surveyResults);
    })
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Magic happening on port " + PORT);
})