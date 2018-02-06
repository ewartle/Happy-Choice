const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const ParticipantsSchema = new Schema({
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function(v) {
                return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v);
            },
            message: '{VALUE} is not a valid email address!'
        }
    }
});

const ChoicesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    score: [{ type: Number }]
});

const SurveysSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    participants: {
        type: Schema.Types.Object,
        ref: "Participants"
    },
    surveyActive: true,
    choices: {
        type: Schema.Types.ObjectId,
        ref: "Choices"
    }
});

const AdminsSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: [true, "Email address is required"],
        unique: true,
        validate: {
            validator: function(v) {
                return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v);
            },
            message: '{VALUE} is not a valid email address!'
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    adminActive: false,
    surveys: {
        type: Schema.Types.ObjectId,
        ref: "Surveys"
    }
});

const Admins = mongoose.model("Admin", AdminSchema);
const Surveys = mongoose.model("Survey", SurveySchema);
const Choices = mongoose.model("Choice", ChoicesSchema);
const Participants = mongoose.model("Participant", ParticipantsSchema);

module.exports = {
    Admin: Admins,
    Survey: Surveys,
    Choices: Choices,
    Participants: Participants
};