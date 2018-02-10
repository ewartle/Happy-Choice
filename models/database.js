const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const ParticipantsSchema = new Schema({
    email: {
        type: String,
        validate: {
            validator: function(v) {
                return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v);
            },
            message: '{VALUE} is not a valid email address!'
        }
    },
    score: [{ type: Number }]
});

const ChoicesSchema = new Schema({
    name: { type: String, required: true },

});

const SurveySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    participant: [{ type: Schema.Types.ObjectId, ref: "Participant" }],
    surveyActive: { type: Boolean, default: true },
    choice: [{ type: Schema.Types.Array, ref: "Choice" }]
});

const AdminSchema = new Schema({
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
        },
    },
    password: { type: String, required: [true, "Password is required"] },
    adminActive: { type: Boolean, default: true },
    surveys: [{ type: Schema.Types.ObjectId, ref: "Survey" }]
});

const Admin = mongoose.model("Admin", AdminSchema);
const Survey = mongoose.model("Survey", SurveySchema);
const Choice = mongoose.model("Choice", ChoicesSchema);
const Participant = mongoose.model("Participant", ParticipantsSchema);

module.exports = { Admin, Survey, Choice, Participant };