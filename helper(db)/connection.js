const { Client } = require("pg");
//postgre / pg nanti tonton lagi videonya.

const db = new Client({
  user: "postgres",
  host: "localhost",
  database: "coffe_shop",
  password: "262626",
  port: 5432,
});

db.connect((err) => {
  if (!err) {
    console.log("Database CoffeeSHop CONNECTED");
  } else {
    console.log("Database Connection Failed", err);
  }
});

module.exports = db;
