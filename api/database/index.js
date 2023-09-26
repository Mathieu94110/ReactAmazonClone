const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://mathieu:Allezlesbleus@cluster0.kljrxuf.mongodb.net/r18jwt?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connexion db ok");
  })
  .catch((e) => {
    console.log("Connexion db ko !", e);
  });
