const {
  createAd,
  getCurrentUserAds,
  deleteAd,
  updateAd,
} = require("../queries/ads.queries");
const postUserAdController = async (req, res) => {
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
const updateUserAdController = async (req, res) => {
  const adId = req.params.adId;
  try {
    const body = req.body;
    await updateAd(adId, body);
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
