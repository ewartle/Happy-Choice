const mongoose = require("mongoose");
const db = require("./models/database.js");
mongoose.Promise = global.Promise;

// This file empties the survey collection and inserts the surveys below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/happy-choice");

// const surveySeed = [{
//         email: "johnny@gmail.com",
//         scores: [70, 30, 0, 0]
//     },
//     {
//         email: "jenny@gmail.com",
//         scores: [10, 70, 10, 10]
//     },
//     {
//         email: "mommy@gmail.com",
//         scores: [0, 10, 45, 45]
//     },
//     {
//         email: "stepdaddy@gmail.com",
//         scores: [10, 0, 20, 70]
//     }
// ]


const srvyid = "5a7e0be2a8662a221c60545b";


db.Survey
    .findByIdAndUpdate(srvyid, { $push: { participants: "5a7e0c99a7046450f8ad8279" } })
    .then(response => {
        console.log('response from survey ', response)
    })
    .catch(err => {
        console.log('error from survey line 100 ', err)
    })
db.Survey
    .findByIdAndUpdate(srvyid, { $push: { participants: "5a7e0c99a7046450f8ad827a" } })
    .then(response => {
        console.log('response from survey ', response)
    })
    .catch(err => {
        console.log('error from survey line 100 ', err)
    })
db.Survey
    .findByIdAndUpdate(srvyid, { $push: { participants: "5a7e0c99a7046450f8ad827b" } })
    .then(response => {
        console.log('response from survey ', response)
    })
    .catch(err => {
        console.log('error from survey line 100 ', err)
    })
db.Survey
    .findByIdAndUpdate(srvyid, { $push: { participants: "5a7e0c99a7046450f8ad827c" } })
    .then(response => {
        console.log('response from survey ', response)
    })
    .catch(err => {
        console.log('error from survey line 100 ', err)
    })



// db.Participant
//     .remove({})
//     .then(() => db.Participant.collection.insertMany(surveySeed))

//     .catch(err => {
//         console.log('error from participant line 104 ', err)
//     })
//     .then(data => {
//         // console.log(data.insertedIds.length + " ...survey records inserted!");
//         process.exit(0);
//     })
//     .catch(err => {
//         console.error(err);
//         process.exit(1);
//     });