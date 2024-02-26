const router = require("express").Router();
const {
  signInController,
  currentController,
  signUpController,
} = require("../controllers/auth.controller");

router.get("/current", currentController);
router.post("/", signInController);
router.post("/signup", signUpController);
router.delete("/", (_, res) => {
  res.clearCookie("token");
  res.end();
});

module.exports = router;