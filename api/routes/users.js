const router = require("express").Router();
const {
  postUserController,
  putProfileController,
  forgotPasswordController,
  getResetPasswordController,
  postResetPasswordController,
} = require("../controllers/user.controller");

router.post("/", postUserController);
router.put("/profile", putProfileController);
router.post("/forgot-password", forgotPasswordController);
router.get("/reset-password/:id/:token", getResetPasswordController);
router.post("/reset-password/:id/:token", postResetPasswordController);

module.exports = router;
