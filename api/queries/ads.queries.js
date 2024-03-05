const Ads = require("../database/models/ads.model");

exports.createAd = (ad) => {
  const newAd = new Ads(ad);
  return newAd.save();
};

exports.getCurrentUserAds = (user) => {
  return Ads.find({ author: { $in: [user._id] } })
    .populate("author")
    .exec();
};
