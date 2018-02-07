const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

// const ParticipantsSchema = new Schema({
//     email: {
//         type: String,
//         unique: true,
//         validate: {
//             validator: function(v) {
//                 return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v);
//             },
//             message: '{VALUE} is not a valid email address!'
//         }
//     }
// });

// const ChoicesSchema = new Schema({
//     name: { type: String, required: true },
//     score: [{ type: Number }]
// });

// const SurveySchema = new Schema({
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     participants: { type: Schema.Types.Object, ref: "Participants" },
//     surveyActive: true,
//     choices: { type: Schema.Types.ObjectId, ref: "Choices" }
// });

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
    adminActive: {type: Boolean, default: true}
    // surveys: { type: Schema.Types.ObjectId, ref: "Surveys" }
});

const Admin = mongoose.model("Admin", AdminSchema);
// const Survey = mongoose.model("Survey", SurveySchema);
// const Choice = mongoose.model("Choice", ChoicesSchema);
// const Participant = mongoose.model("Participant", ParticipantsSchema);

module.exports = Admin;

