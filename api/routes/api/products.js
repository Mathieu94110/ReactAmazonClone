const ProductsModel = require("../../database/models/products.model");
const router = require("express").Router();
const expressAsyncHandler = require("express-async-handler");

router.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await ProductsModel.find({});
    res.send(products);
  })
);

module.exports = router;
