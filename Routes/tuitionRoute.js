const express = require('express')

const { createTuition, getAllTuition, deleteTuition } = require('../Controller/tuitionController')

const router = express.Router()


//post a new tuition
router.post('/', createTuition)

//Get all tuitions
router.get('/', getAllTuition)

//delete tuition
router.delete('/:id', deleteTuition )

module.exports = router