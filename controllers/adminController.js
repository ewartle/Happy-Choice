// const db = require("../models");
const { Admin, Survey, Choice, Participant } = require('../models/database.js');
// Defining methods for the surveyController
module.exports = {
    findOne: function(req, res) {
        console.log(req.params.email);
        console.log(typeof(req.params.email));
        Admin
            .findOne({ email: req.params.email })
            .then(dbAdmin => res.json(dbAdmin))
            .catch(err => res.status(422).json(err));
    },
    // findById: function(req, res) {
    //   db.Admin
    //     .findById(req.params.id)
    //     .then(dbAdmin => res.json(dbAdmin))
    //     .catch(err => res.status(422).json(err));
    // },
    // findAll: function(req, res) {
    //     Admin
    //         .findById({ _id: req.params.id })
    //         .then(dbAdmin => {
    //             res.json(dbAdmin);
    //             console.log(dbAdmin);
    //         })
    //         .catch(err => res.status(422. json(err)));

    // },

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
        console.log("Hit the survey create POST route")
        console.log(req.body);
        console.log(req.params.id);
        Survey
            .create(req.body)
            .then(function(dbSurvey) {
                console.log("You successfully created a new survey")
                console.log(dbSurvey.id)
                Admin.findOneAndUpdate({ _id: req.params.id }, { $push: { surveys: dbSurvey._id } }, { new: true })
                    .then((dbAdmin) => {
                        console.log("Successfully updated Admin")
                        res.json(dbAdmin)
                    })
                    .catch((err) => {
                        console.log(err.message)
                    })
            })
            .catch(err => {
                console.log(err.message);
                res.status(422).json(err);
            })
    },

    updatevotes: function(req, res) {
        console.log("Hit the survey create POST route");
        console.log(req.body);
        Participant
            .findOneAndUpdate({ _id: req.params.id }, { $set: { score: req.body } })
            .then((dbAdmin) => {
                console.log("Successfully updated Admin")
                res.json(dbAdmin)
            })
            .catch((err) => {
                console.log(err.message);
                res.status(422).json(err);
            })
    }

    // createchoices: function(req, res) {
    //     console.log(req.body);
    //     console.log(req.params.id);
    //     Choice
    //         .create(req.body)
    //         .then(function(dbChoices) {
    //             return Survey.findOneAndUpdate({ _id: req.params.id }, { $push: { choices: dbChoices._id } }, { new: true });
    //         })
    //         .then(dbAdmin => res.json(dbAdmin))
    //         .catch(err => {
    //             console.log(err.message);
    //             res.status(422).json(err);
    //         })
    // }
    // remove: function(req, res) {
    //   db.Survey
    //     .findById({ _id: req.params.id })
    //     .then(dbModel => dbModel.remove())
    //     .then(dbModel => res.json(dbModel))
    //     .catch(err => res.status(422).json(err));
    // }
};