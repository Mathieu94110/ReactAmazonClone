const express = require("express");
const cookie = require("cookie-parser");

const app = express();
const routes = require("./routes");
app.use(cookie());
app.use(express.json());
app.get("/bonjour", (req, res) => {
  res.send("ok");
});
require("./database");
app.use(routes);

app.use("*", (req, res) => {
  res.status(404).json("mauvaise routes");
});
app.listen(3001);
