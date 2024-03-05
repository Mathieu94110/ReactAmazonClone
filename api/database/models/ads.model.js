const mongoose = require("mongoose");
const schema = mongoose.Schema;
const adsSchema = schema(
  {
    title: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: schema.Types.ObjectId, ref: "user", required: true },
  },
  {
    timestamps: true,
  }
);

const AdsModel = mongoose.model("ads", adsSchema);

module.exports = AdsModel;
