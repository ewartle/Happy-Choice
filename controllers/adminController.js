// const db = require("../models");
const { Admin, Survey, Choice, Participant } = require('../models/database.js');
// Defining methods for the surveyController
module.exports = {
    findOne: function(req, res) {
        Admin
            .findOne({ email: req.params.email })
            .then(dbAdmin => res.json(dbAdmin))
            .catch(err => res.status(422).json(err));
    },
    findAll: function(req, res) {
        Admin
            .findById({ _id: req.params.id })
            .populate("surveys")
            .then(dbAdmin => {
                res.json(dbAdmin);
            })
            .catch(err => res.status(422).json(err));
    },


    create: function(req, res) {
        console.log("Hit the admin create POST route");
        console.log(req.params);
        console.log(typeof(req.params));
        Admin
            .create(req.body)
            .then(dbAdmin => {
                res.json(dbAdmin);
                console.log("Successfully created Admin");
            })
            .catch(err => {
                console.log(err.message);
                res.status(422).json(err);
            });
    },

    createsurvey: function(req, res) {
        const survey = {
            name: req.body.name,
            description: req.body.description,
            choice: req.body.choice,
        };
        let surveyId;
        let participants = req.body.participant;
        let score = req.body.score;
        Survey
            .create(survey)
            .then(function(dbSurvey) {
                surveyId = dbSurvey._id;
                console.log("You successfully created a new survey");
                // console.log(dbSurvey);
                Admin.findOneAndUpdate({ _id: req.params.id }, { $push: { surveys: dbSurvey._id } }, { new: true })
                    .then((dbAdmin) => {
                        // console.log("Successfully updated Admin");
                        createParticipants(surveyId, participants, score, function ( err ) {
                            if ( err ) res.json( err );
                            res.json(dbAdmin);
                        });
                    })
                    .catch((err) => {
                        console.log('error from Admin line 68', err.message);
                    })
            })
            .catch(err => {
                console.log('error from survey line 72 ', err.message);
                res.status(422).json(err);
            })

        const createParticipants = (srvyid, emails, score, cb) => {
            const participants = emails.map( ( email ) => {
                return { email: email, score: score };
            });
            Participant
                .create( participants )
                .then(dbParticipants => {
                    const participantIds = dbParticipants.map( participant => participant._id );
                    Survey
                        .findByIdAndUpdate(srvyid, { participant: participantIds })
                        .then(response => {
                            console.log('response from survey ', response);
                            cb( null );
                        })
                        .catch(err => {
                            console.log('error from survey line 100 ', err);
                            cb( err );
                        })
                })
                .catch(err => {
                    console.log('error from participant line 104 ', err);
                });
        };

    },

    updatevotes: function(req, res) {
        console.log("Hit the survey create POST route");
        console.log(req.body);
        Participant
            .findOneAndUpdate({ _id: req.body[1] }, { $set: { score: req.body[0] } })
            .then((dbAdmin) => {
                console.log("Successfully updated Survey");
                res.json(dbAdmin);
            })
            .catch((err) => {
                console.log(err.message);
                res.status(422).json(err);
            })
    },

    findresults: function(req, res) {
        console.log("Hit the survey get results route");
        console.log(req.params.id);
        Survey
            .findById({ _id: req.params.id })
            .populate("participant")
            .then(dbAdmin => {
                res.json(dbAdmin);
                console.log("survey populated with email", dbAdmin);
                console.log("Successfully pulled results");
            })
            .catch(err => res.status(422).json(err.message));
    }
};