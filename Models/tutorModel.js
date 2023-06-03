const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

// For Validation
const validator = require('validator');

// Define the Tutor schema
const tutorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Provide a name. Name might be missing in React request or named dfferently']
    },
    phonenumber: {
        type: String,
        required: [true, 'Please Provide phone number. Phone number might be missing in React request or named dfferently'],
        unique: true,
        minlength: 11,
        maxlength: 15
    },
    email: {
        type: String,
        required: [true, 'Please Provide email. Email might be missing in React request or named differently'],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email'
        }
    },
    password: {
        type: String,
        required: [true, 'Please Provide password. Password might be missing in React request or named dfferently'],
        select: false
    },
    picture: {
        type: String,
        required: [true, 'Please Provide a picture of yourself. Picture might be missing in React request or named dfferently']
    },
    certificates: [{
        type: String,
        required: [true, 'Please Provide Pictures of your NID and Certificates. Picture might be missing in React request or named dfferently']
    }],

},
    {
        timestamps: true
    });

//To encode the password
tutorSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // console.log(this.password)
})

//To Generate JWT for sessions
tutorSchema.methods.createJWT = function () {
    return jwt.sign({ tutorID: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
}

tutorSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
}


const tutors = mongoose.model("Tutors", tutorSchema);
module.exports = tutors;