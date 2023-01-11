const express = require("express"); //import
const router = express();

//import route
//untuk product
const productRoute = require("./route-product");
//end

//untuk order
const orderRoute = require("./route-order");
//end
//end import route

const authRoute = require("./route-auth");

router.get("/", (req, res) => {
  return res.send("backend for coffe shop");
});

router.use("/product", productRoute);
router.use("/auth", authRoute);
router.use("/order", orderRoute);

module.exports = router;
