const express = require("express");
const router = express();

//import controller
const authController = require("../controller/controller-auth");

router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;
