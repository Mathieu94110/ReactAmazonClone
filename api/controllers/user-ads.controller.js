const { createAd } = require("../queries/ads.queries");
const postUserAdController = async (req, res, next) => {
  try {
    const body = req.body;
    await createAd({ ...body, author: req.user._id });
    res.json({ message: "L'annonce a été crée !" });
  } catch (e) {
    const errors = Object.keys(e.errors).map((key) => e.errors[key].message);
    res
      .status(400)
      .render("tweets/tweet-form", {
        errors,
        isAuthenticated: req.isAuthenticated(),
        currentUser: req.user,
      });
  }
};
const getUserAdsController = async (userId) => {};
const updateUserAdController = async (userId, id) => {};
const deleteUserAdController = async (userId, id) => {};

module.exports = {
  postUserAdController,
  getUserAdsController,
  updateUserAdController,
  deleteUserAdController,
};
