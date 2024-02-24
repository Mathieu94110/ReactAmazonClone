const ProductsModel = require("../database/models/Products.model");
const router = require("express").Router();
const expressAsyncHandler = require("express-async-handler");

router.get(
  "/",
  expressAsyncHandler(async (_, res) => {
    const products = await ProductsModel.find({});
    res.send(products);
  })
);

module.exports = router;
