const router = require("express").Router();
const UserModel = require("../../database/models/user.model");
const bcrypt = require("bcrypt");
const expressAsyncHandler = require("express-async-handler");

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new UserModel({
    name,
    email,
    password: await bcrypt.hash(password, 8),
  });

  try {
    const user = await newUser.save();
    res.json(user);
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      res.status(400).json("Email déjà utilisé");
    } else {
      res.status(400).json("Problème lors de la création de l'utilisateur");
    }
  }
});

router.put(
  "/profile",
  expressAsyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.body.userId);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.fullName = req.body.fullName || "";
      user.address = req.body.address || "";
      user.city = req.body.city || "";
      user.postalCode = req.body.postalCode || null;
      user.country = req.body.country || "";
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        address: updatedUser.address,
        city: updatedUser.city,
        postalCode: updatedUser.postalCode,
        country: updatedUser.country,
      });
    }
  })
);

module.exports = router;
