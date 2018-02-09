const mongoose = require("mongoose");
const db = require("./models/database.js");
mongoose.Promise = global.Promise;

// This file empties the survey collection and inserts the surveys below

mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/happy-choice" );

const surveySeed = [
  {
    name: "VanWilder Family Vacation",
    description: "Where should the VanWilder family go on vacation?",
    participants: [],
    surveyActive: true,
    choice: []
  }];

db.Survey
  .remove({})
  .then(() => db.Survey.collection.insertMany(surveySeed))
  .then(data => {
    console.log(data.insertedIds.length + " ...survey records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });