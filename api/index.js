const express = require("express");
const cookie = require("cookie-parser");
const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: ["https://react-amazon-clone-xi.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
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
