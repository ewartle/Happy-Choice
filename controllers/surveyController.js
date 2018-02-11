const { Admin, Survey, Choice, Participant } = require('../models/database.js');
const calculateSurveyResults = require('../calculate.js');

// Defining methods for the surveyController
module.exports = {


    // findAll: function(req, res) {
    //   db.Survey
    //     .find(req.query)
    //     .sort({ date: -1 })
    //     .then(dbModel => res.json(dbModel))
    //     .catch(err => res.status(422).json(err));
    // },
    findById: function(req, res) {
        console.log("Hit the survey get survey ");
        Survey
            .findById(req.params.id)
            .then(dbSurvey => {
                res.json(dbSurvey);
                console.log(dbSurvey);
                console.log("Successfully pulled results");
            })
            .catch(err => res.status(422).json(err.message));
    },

    calculate: function(req, res) {
        console.log("surveyId", req.params.id);
        Survey
            .findById({ _id: req.params.id })
            .populate("participant")
            // .then(dbAdmin => {
            //     res.json(dbAdmin.participant[0].score[[0]]);
            //     console.log(dbAdmin.participant[0].score[[0]]);
            // })
            .then((survey) => {
                let surveyResults = calculateSurveyResults(survey);
                res.json(surveyResults);
            })
            .catch(err => res.status(422).json(err));
    }
};