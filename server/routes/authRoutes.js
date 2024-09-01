const express = require("express");
const { signup, login, forgot_password,reset_password } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login); 
router.post("/forgot-password",forgot_password)
router.post("/reset-password",reset_password)

module.exports = router;
