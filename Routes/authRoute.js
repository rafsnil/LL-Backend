const express = require('express');
const router = express.Router();
const { loginUser, micTeshting123, registerUser } = require('../Controller/authController');


// Route for sign-in
router.route('/').get(micTeshting123);
router.route('/api/login').post(loginUser);
router.route('/api/register').post(registerUser);

module.exports = router;

