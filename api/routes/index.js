const router = require("express").Router();
const apiUsers = require("./users");
const apiAuth = require("./auth");
const apiProducts = require("./products");

router.use("/api/users", apiUsers);
router.use("/api/auth", apiAuth);
router.use("/api/products", apiProducts);

module.exports = router;
