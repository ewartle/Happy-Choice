const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const calculateSurveyResults = require('./algorithm-code.js')

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/happy-choice"); //mongodb://localhost/fullstack-jeopardy

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







var survey = {
  name: "VanWilder Family Vacation",
  participants: [
    {name: "johnny",
      scores: [70, 30, 0, 0]
    },
    {name: "jenny",
      scores: [10, 70, 10, 10]
    },
    {name: "mommy",
      scores: [0, 10, 45, 45]
    },
    {name: "stepdaddy",
      scores: [10, 0, 20, 70]
    }
  ]
};

// var participantScoreHistory = [];

// //Get option scores by participant from db and load into <participants_opt_scores></participants_opt_scores>
// // mongoose db.survey.findById({req.params.id})
// //   .then {

//         var participants = survey.participants;
//         var participants_opt_scores = participants.map((participant) => {
//           var participantScores = participant.scores;
//           participantScoreHistory.push(participantScores);
//           return participantScoreHistory;
//       });
// // };

// app.get('/algorithm-code', (req, res) => {
//   console.log("You hit the algorithm-code route");
//     let surveyResults = calculateSurveyResults(participantScoreHistory);
//     res.json(surveyResults);
// })


app.get('/algorithm-code', (req, res) => {
  console.log("You hit the algorithm-code route");
    let surveyResults = calculateSurveyResults(survey);
    res.json(surveyResults);
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Magic happening on port " + PORT);
})