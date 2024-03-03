const router = require("express").Router();
const {
  postUserAdController,
  getUserAdsController,
  updateUserAdController,
  deleteUserAdController,
} = require("../controllers/user-ads.controller");

router.post("/", postUserAdController);
router.get("/ads/:id", getUserAdsController);
router.post('/update/:adId', updateUserAdController);
router.delete("/:adId", deleteUserAdController);

module.exports = router;
