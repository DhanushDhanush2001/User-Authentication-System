const express = require('express');
const{registerUser,loginUser,logoutUser,forgotPassword,resetPassword} = require('../Controller/authController');
const { loginValidation, registerValidation,forgotPasswordValidation,resetPasswordValidation } = require('../validators/authValidators');
const router = express.Router();
const handleValidationErrors = require('../Middleware/handleValidationErrors');






router.route('/register').post(registerValidation,handleValidationErrors,registerUser);
router.route('/login').post(loginValidation,handleValidationErrors,loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotPasswordValidation,handleValidationErrors,forgotPassword);
router.route('/password/reset/:token').post(resetPasswordValidation,handleValidationErrors,resetPassword);


module.exports = router;