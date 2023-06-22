const mongoose = require("mongoose");
//  phonenumber, institution, classtype, subjects, location, salary, description
// Define the Tuition schema
const tuitionsSchema = new mongoose.Schema({
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    phonenumber: {
        type: String,
        required: [true, 'Phonenumber might be missing in REACT request or named dfferently']
    },
    institution: {
        type: String,
        required: [true, 'Institution might be missing in REACT request or named dfferently']
    },
    classtype: {
        type: String,
        required: [true, 'Classtype might be missing in REACT request or named dfferently']
    },
    subjects: {
        type: String,
        required: [true, 'Subjects might be missing in REACT request or named dfferently']

    },
    location: {
        type: String,
        required: [true, 'Location might be missing in REACT request or named dfferently']

    },
    salary: {
        type: Number,
        required: [true, 'Salary might be missing in REACT request or named dfferently']

    },
    description: {
        type: String,
        required: [true, 'Description might be missing in REACT request or named dfferently']

    },
    userId: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    });

const tuitions = mongoose.model("Tuitions", tuitionsSchema);
module.exports = tuitions;


