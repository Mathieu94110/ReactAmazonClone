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

router.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await ProductsModel.findById(req.params.id);

    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Produit non trouvé!" });
    }
  })
);

module.exports = router;
