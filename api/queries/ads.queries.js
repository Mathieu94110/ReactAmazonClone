const Ads = require("../database/models/ads.model");

exports.createAd = (ad) => {
  const newAd = new Ads(ad);
  return newAd.save();
};

exports.getCurrentUserAds = (userId) => {
  return Ads.find({ author: userId }).populate("author").exec();
};

exports.deleteAd = (adId) => {
  return Ads.findByIdAndDelete(adId).exec();
};
