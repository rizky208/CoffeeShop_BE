require("dotenv").config();
const { urlencoded, json } = require("express");
const express = require("express");
const app = express();
const router = require("./src/route/route-index");
const cors = require("cors");
app.use("/uploads", express.static("uploads"));

app.use(urlencoded({ extended: true }));
//menerima json
app.use(json());
//cors untuk yang lebih spesifik.
// app.use(
//   cors({
//     origin: [""],
//   })
// );
app.use(cors()); //global bisa di akses semua
app.use("/api/v1/", router);

app.get("*", (req, res) => {
  return res.send({
    status: 404,
    message: "not found",
  });
});

app.listen(5000, (req, res) => {
  console.log("Coffee Shop backend successfully running on port 5000");
});
