const router = require("express").Router();
const {
  postUserAdController,
  getUserAdsController,
  updateUserAdController,
  deleteUserAdController,
} = require("../controllers/user-ads.controller");
router.post("/", postUserAdController);
router.put("/update/:adId", updateUserAdController);
router.get("/:userId", getUserAdsController);
router.delete("/:adId", deleteUserAdController);

module.exports = router;
