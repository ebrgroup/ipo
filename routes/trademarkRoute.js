const express = require("express");
const router = express.Router();

const tradeMarkController = require("../controllers/trademarkController.js");

router.get('/trackIp/trademark/:id', tradeMarkController.trackTrademark);
router.get('/searchIp/trademark/:name', tradeMarkController.searchTrademark);
router.get('/dashboard/user/countIp/:id', tradeMarkController.userTrademark);

router.post("/trademark", tradeMarkController.insertTradeMark);

module.exports = router;