const {
  createAd,
  getCurrentUserAds,
  deleteAd,
} = require("../queries/ads.queries");
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

getUserAdsController = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const ads = await getCurrentUserAds(userId);
    res.send(ads);
  } catch (e) {
    next(e);
  }
};
const updateUserAdController = async (req, res, next) => {};

deleteUserAdController = async (req, res) => {
  try {
    const adId = req.params.adId;
    await deleteAd(adId);
    res.sendStatus(200);
  } catch (e) {
    const message = e.errors
      ? e.errors[0]
      : e.message
      ? e.message
      : "Problème serveur";
    res.json({ message });
  }
};

module.exports = {
  postUserAdController,
  getUserAdsController,
  updateUserAdController,
  deleteUserAdController,
};
