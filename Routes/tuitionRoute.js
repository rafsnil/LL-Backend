const express = require('express')

const { createTuition, getAllTuition } = require('../Controller/tuitionController')

const router = express.Router()


//post a new tuition
router.post('/', createTuition)

//Get all tuitions
router.get('/', getAllTuition)

module.exports = router