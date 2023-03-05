const express = require("express");
const router = express();
const formUpload = require("../../helper(db)/formUpload");

//import controller
const authController = require("../controller/controller-auth");

router.post("/login", authController.login);
router.post("/register", authController.register);

router.get("/users", authController.get);
router.get("/users/:id", authController.getDetail);
router.patch(
  "/users/:id",
  formUpload.single("profile_image"),
  authController.update
);
router.delete("/users/:id", authController.remove);

module.exports = router;
