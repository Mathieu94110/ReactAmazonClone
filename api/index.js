const express = require("express");
require("dotenv").config();
const cookie = require("cookie-parser");
const cors = require("cors");
const app = express();
const routes = require("./routes");
app.use(cookie());
app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
require("./database");
app.use(routes);

app.use("*", (req, res) => {
  res.status(404).json("mauvaise routes");
});
app.listen(process.env.PORT);
