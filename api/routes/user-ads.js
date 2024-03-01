const router = require("express").Router();
const {
  postUserAdController,
  getUserAdsController,
  updateUserAdController,
  deleteUserAdController,
} = require("../controllers/user-ads.controller");

router.post("/", postUserAdController);
router.get("/ads/:id", getUserAdsController);
router.put("/:id", updateUserAdController);
router.delete("/:id", deleteUserAdController);

module.exports = router;
