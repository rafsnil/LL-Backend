const tuition = require("../Models/tuitionModel");
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthorizedError } = require("../Errors/index");

const createTuition = async (req, res) => {
    const { userId, phonenumber, institution, classtype, subjects, location, salary, description } = req.body;

    if (!userId || !phonenumber || !institution || !classtype || !subjects || !location || !salary || !description) {
        throw new BadRequestError("Please Provide All Values");
    }
}

const deleteTuition = async (req, res) => {
    res.send('')
}

const getAllTuition = async (req, res) => {
    res.send('')
}

const updateTuition = async (req, res) => {
    res.send('')
}

const showStatsOfTuition = async (req, res) => {
    res.send('')
}

modules.export = { createTuition, deleteTuition, getAllTuition, updateTuition, showStatsOfTuition };