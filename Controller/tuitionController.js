const tuitions = require("../Models/tuitionModel");
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthorizedError } = require("../Errors/index");

const createTuition = async (req, res) => {
    const { phonenumber, institution, classtype, subjects, location, salary, description } = req.body;

    if (!phonenumber || !institution || !classtype || !subjects || !location || !salary || !description) {
        throw new BadRequestError("Please Provide All Values");
    }

    // req.body.userId = req.user.userID;
    try{
        const tuition = await tuitions.create({ phonenumber, institution, classtype, subjects, location, salary, description })
    res.status(StatusCodes.CREATED).json( tuition );
    } catch (error){
        res.status(400).json({ error: error.message })
    }
    
}

const deleteTuition = async (req, res) => {
    res.send('')
}

const getAllTuition = async (req, res) => {
    const tuition = await tuitions.find({}).sort({createdAt: -1})

    res.status(200).json( tuition )
}

const updateTuition = async (req, res) => {
    res.send('')
}

const showStatsOfTuition = async (req, res) => {
    res.send('')
}

// modules.export = { createTuition, deleteTuition, getAllTuition, updateTuition, showStatsOfTuition };
module.exports = { createTuition, getAllTuition };