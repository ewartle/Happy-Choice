const mongoose = require("mongoose");
const db = require("./models/database.js");
mongoose.Promise = global.Promise;

// This file empties the survey collection and inserts the surveys below

mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/happy-choice" );

const surveySeed = [
  {
    name: "VanWilder Family Vacation",
    description: "Where should the VanWilder family go on vacation?",
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
    ],
    surveyActive: true,
    choice: []
  },
  {
    name: "Williams Family Friday Dinner",
    description: "What shall the Williams Family eat for dinner on Friday?",
    participants: [
      {name: "bobby",
        scores: [20, 10, 50, 20]
      },
      {name: "lisa",
        scores: [5, 70, 10, 15]
      },
      {name: "mom",
        scores: [0, 5, 55, 40]
      },
      {name: "dad",
        scores: [10, 10, 20, 60]
      }
    ],
    surveyActive: true,
    choice: []
  }
];

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
