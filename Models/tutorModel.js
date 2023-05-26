const mongoose = require("mongoose");

// Define the Tutor schema
const tutorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: String, required: true },
    email: { type: String, required: true },
    DOB: { type: Date, required: true },
    certificates: [{ type: String }],
    picture: { type: String },
    studentId: { type: String, required: true },
    password: { type: String, required: true }
},
    {
        timestamps: true
    });

const tutors = mongoose.model("Tutors", tutorsSchema);
module.exports = tutors;