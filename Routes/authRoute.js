const express = require('express');
const router = express.Router();
const { loginUser, micTeshting123, registerUser, registerTutor, loginTutor } = require('../Controller/authController');
const upload = require('../Middleware/multerforimageupload');

// Route for sign-in
router.route('/').get(micTeshting123);
router.route('/user').post(loginUser);
router.route('/tutor').post(loginTutor);
router.route('/userreg').post(registerUser);
router.route('/tutorreg').post(upload.any(), registerTutor);

module.exports = router;

