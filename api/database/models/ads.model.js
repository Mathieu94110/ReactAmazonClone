const mongoose = require("mongoose");

const adsSchema = mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const AdsModel = mongoose.model("ads", adsSchema);

module.exports = AdsModel;
