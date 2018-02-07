const db = require("../models");

// Defining methods for the surveyController
module.exports = {
  findOne: function(req, res) {
    console.log(req.params.email);
    console.log(typeof(req.params.email));
    db.Admin
      .findOne({email: req.params.email})
      .then(dbAdmin => res.json(dbAdmin))
      .catch(err => res.status(422).json(err));
  },
  // findById: function(req, res) {
  //   db.Admin
  //     .findById(req.params.id)
  //     .then(dbAdmin => res.json(dbAdmin))
  //     .catch(err => res.status(422).json(err));
  // },
  create: function(req, res) {
    db.Admin
      .create(req.body)
      .then(dbAdmin => res.json(dbAdmin))
      .catch(err => res.status(422).json(err));
  }
  // update: function(req, res) {
  //   db.Survey
  //     .findOneAndUpdate({ _id: req.params.id }, req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // remove: function(req, res) {
  //   db.Survey
  //     .findById({ _id: req.params.id })
  //     .then(dbModel => dbModel.remove())
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // }
};
