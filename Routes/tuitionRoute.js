const express = require('express')

const { createTuition, getAllTuition, deleteTuition } = require('../Controller/tuitionController')

const router = express.Router()
const auth = require('../Middleware/authenticateUserHandler')

//auth for all tuition routes
router.use(auth)
//post a new tuition
router.post('/', createTuition)

//Get all tuitions
router.get('/', getAllTuition)

//delete tuition
router.delete('/:id', deleteTuition )

module.exports = router