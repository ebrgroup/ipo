const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/users', userController.fetchUsersData);

router.get('/users/:id', userController.fetchUserData);

router.post('/users', userController.createUserDocument);

router.put('/users/:id', userController.updateUserData);

router.put('/users/changePassword/:id', userController.changePassword);

router.delete('/users/:id', userController.deleteUserData);

module.exports = router;