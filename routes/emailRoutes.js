const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");

router.post("/email/otpVerification", emailController.verifyOTP);

router.post("/email/sendEmail", emailController.sendEmailForResetPassword);

module.exports = router;