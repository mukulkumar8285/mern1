const express = require("express");
const Auth = require("../controller/auth");

const router = express.Router();

router.post("/login", Auth.Login);
router.post("/signup", Auth.Signup);

module.exports = router;
