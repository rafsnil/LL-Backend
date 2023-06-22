const tuitions = require("../Models/tuitionModel");
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthorizedError } = require("../Errors/index");
const mongoose = require('mongoose');

const createTuition = async (req, res) => {
    const { phonenumber, institution, classtype, subjects, location, salary, description } = req.body;

    if (!phonenumber || !institution || !classtype || !subjects || !location || !salary || !description) {
        throw new BadRequestError("Please Provide All Values");
    }

    // req.body.userId = req.user.userID;
    try{
        const user_id = req._id
        const tuition = await tuitions.create({ phonenumber, institution, classtype, subjects, location, salary, description, user_id })
    res.status(StatusCodes.CREATED).json( tuition );
    } catch (error){
        res.status(400).json({ error: error.message })
    }
    
}

const deleteTuition = async (req, res) => {
    const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such tuition'})
  }

  const tuition = await tuitions.findOneAndDelete({_id: id})

  if(!tuition) {
    return res.status(400).json({error: 'No such tuition'})
  }

  res.status(200).json( tuition )
}



const getAllTuition = async (req, res) => {

    const user_id = req.user._id
    const tuition = await tuitions.find({user_id}).sort({createdAt: -1})

    res.status(200).json( tuition )
}

const updateTuition = async (req, res) => {
    res.send('')
}

const showStatsOfTuition = async (req, res) => {
    res.send('')
}

module.exports = { createTuition, getAllTuition, deleteTuition };