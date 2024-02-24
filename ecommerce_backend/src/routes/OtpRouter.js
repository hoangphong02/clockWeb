const express = require("express");
const router = express.Router();
const otpController = require("../controllers/OtpController");
const {
  authUserMiddleWare,
  authMiddleWare,
} = require("../MiddleWare/authMiddleWare");

router.post("/create", otpController.createOtp);
router.delete("/delete-otp/:id", otpController.deleteOtp);
module.exports = router;
