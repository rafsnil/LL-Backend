const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

// For Validation
const validator = require('validator');

//Define the User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please Provide username. FOR MAHADI: username might be missing in React request or named dfferently']
    },
    usernumber: {
        type: String,
        required: [true, 'Please Provide usernumber. FOR MAHADI: usernumber might be missing in React request or named dfferently'],
        unique: true,
        minlength: 11,
        maxlength: 15
    },
    email: {
        type: String,
        required: [true, 'Please Provide email. FOR MAHADI: email might be missing in React request or named differently'],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email'
        }
    },
    password: {
        type: String,
        required: [true, 'Please Provide password. FOR MAHADI: Password might be missing in React request or named dfferently'],
        select: false
    }
},
    {
        timestamps: true
    });

//To encode the password
userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log(this.password)
})

//To Generate JWT for sessions
userSchema.methods.createJWT = function () {
    return jwt.sign({ userID: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
}

const users = mongoose.model("Users", userSchema);
module.exports = users;