const express = require("express");
const router = express.Router()
const { signup, signin } = require("../handlers/auth");
const {sendResetEmail, receiveNewPassword} = require("../handlers/email");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/reset/:email", sendResetEmail);
router.post("/reset/:userID/:token", receiveNewPassword);

module.exports = router;