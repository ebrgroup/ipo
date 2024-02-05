const express = require("express");
const router = express.Router();
const messagingController = require("../controllers/messagingController");

router.post("/messaging/sendOTP", messagingController.sendOTP);

router.post("/messaging/verifyOTP", messagingController.verifyOTP);

module.exports = router;