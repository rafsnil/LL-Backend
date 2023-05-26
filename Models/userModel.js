const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();


//Define the User schema
const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    // userNumber: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false }
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