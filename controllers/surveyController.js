const { Admin, Survey, Choice, Participant } = require('../models/database.js');

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
            .then(dbAdmin => {
                res.json(dbAdmin);
                console.log(dbAdmin);
                //     .then((response) => {
                //             // let surveyResults = calculateSurveyResults( survey.toObject() );
                //             console.log("this is the populated survey", response);
                //             survey = response;
                //             res.json(response);
                //         })
                //         .then(() => {
                //             for (let i = 0; i < survey.participant.length; i++) {
                //                 console.log("participant id", survey.participant[i])
                //                 Participant.findById({ _id: survey.participant[i] }).populate("score")
                //             }
                //         })
                //         .then((part) => console.log(part))
                // }
            })
            .catch(err => res.status(422).json(err));
    }
};