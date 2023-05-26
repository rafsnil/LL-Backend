const mongoose = require("mongoose");

// Define the Tuition schema
const tuitionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    salary: { type: Number, required: true },
    description: { type: String, required: true },
    tutorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tutor' }
},
    {
        timestamps: true
    });

const tuitions = mongoose.model("Tuitions", tuitionsSchema);
module.exports = tuitions;