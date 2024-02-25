const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(
    MONGO_URI
  )
  .then(() => {
    console.log("Connexion db ok");
  })
  .catch((e) => {
    console.log("Connexion db ko !", e);
  });
