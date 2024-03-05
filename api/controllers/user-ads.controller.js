const { createAd } = require("../queries/ads.queries");
const postUserAdController = async (req, res, next) => {
  try {
    const data = req.body.data;
    await createAd({ ...data });
    res.json({ message: "L'annonce a été crée !" });
  } catch (e) {
    const message = e.errors
      ? e.errors[0]
      : e.message
      ? e.message
      : "Problème serveur";
    res.json({ message });
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
