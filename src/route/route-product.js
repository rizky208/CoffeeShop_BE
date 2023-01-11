const express = require("express");
const router = express();

//import controller
const productController = require("../controller/controller-product");

const formUpload = require("../../helper(db)/formUpload");

router.get("/", productController.get);
router.get("/:id", productController.getDetail);
router.post("/", formUpload.single("img"), productController.add);
// router.put('/', productController.update)
router.patch("/:id", productController.update);
router.delete("/:id", productController.remove);

// delete //remove

module.exports = router;
