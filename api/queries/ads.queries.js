const Ads = require("../database/models/ads.model");

exports.createAd = (ad) => {
  const newAd = new Ads(ad);
  return newAd.save();
};
