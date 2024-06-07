const userController = require('./../controller/userController');
const express = require('express');
const router = express.Router();

router.post('/auth/register', userController.register);
router.post('/auth/login', userController.login);
router.post('/auth/login', userController.login);
router.post('/auth/setavatar/:id', userController.setAvatar);
router.get('/getallusers/:id', userController.getAllContacts);

module.exports = router;
