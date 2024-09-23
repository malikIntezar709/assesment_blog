const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

const { validateUserRegistration, handleValidationErrors } = require('../validatores/validate');


router.post('/register', validateUserRegistration, handleValidationErrors, authController.register);
router.post('/login', authController.login);


module.exports = router;
