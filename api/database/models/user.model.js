const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: String,
  address: String,
  city: String,
  country: String,
  fullName: String,
  postalCode: Number,
});

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hash(password, 8);
};
userSchema.statics.hashSyncPassword = (password) => {
  return bcrypt.hash(password, 8);
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.local.password);
};

const User = mongoose.model("user", userSchema);
module.exports = User;
