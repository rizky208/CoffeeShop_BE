const express = require("express");
const verifyToken = require("../../helper(db)/verifyToken");
const router = express();

//import controller
const orderController = require("../controller/controller-order");
//end import

router.get("/", orderController.get);
router.get("/:id", orderController.getDetail);
router.post("/", verifyToken, orderController.add);
router.patch("/:id", orderController.update);
router.delete("/:id", orderController.remove);

module.exports = router;
