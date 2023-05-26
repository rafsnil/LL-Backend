const express = require('express');
const router = express.Router();
const { createUser, deleteUserByID, getAllUser, updateUserById, showStatsOfUser } = require('../Controller/userController');

router.route('/').post(createUser).get(getAllUser);

router.route('/:id').delete(deleteUserByID).patch(updateUserById);

// router.route('/delete').post(deleteUser);
// router.route('/register').post(getAllUser);
// router.route('/register').post(updateUser);


router.route('/stats').get(showStatsOfUser);

module.exports = router;