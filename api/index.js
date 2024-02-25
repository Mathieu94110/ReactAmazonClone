const express = require("express");
const path = require("path");
require("dotenv").config();
const cookie = require("cookie-parser");
const cors = require("cors");
const config =  require('./config.js');
const app = express();

const routes = require("./routes");
app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(cookie());
require("./database");
app.use(routes);

app.use("*", (req, res) => {
  res.status(404).json("mauvaise routes");
});
app.listen(config.PORT);
