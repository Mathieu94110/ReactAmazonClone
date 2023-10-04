const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  address: String,
  city: String,
  country: String,
  fullName: String,
  postalCode: Number,
});

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
