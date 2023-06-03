const express = require('express');
const router = express.Router();
const { loginUser, micTeshting123, registerUser, registerTutor } = require('../Controller/authController');
const upload = require('../Middleware/multerforimageupload');


// Route for sign-in
router.route('/').get(micTeshting123);
router.route('/api/login').post(loginUser);
router.route('/api/userregister').post(registerUser);
router.route('/api/tutorregister').post(upload.any(), registerTutor);

module.exports = router;

