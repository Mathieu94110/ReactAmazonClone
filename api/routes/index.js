const router = require("express").Router();
const apiUsers = require("./users");
const apiAuth = require("./auth");
const apiProducts = require("./products");
const apiUserAds = require("./user-ads");

router.use("/api/users", apiUsers);
router.use("/api/auth", apiAuth);
router.use("/api/products", apiProducts);
router.use("api/user-ads", apiUserAds);
module.exports = router;
