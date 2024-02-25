const router = require("express").Router();
const User = require("../database/models/User.model");
const expressAsyncHandler = require("express-async-handler");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const JWT_SECRET = process.env.JWT_SECRET;
const APP_PASSWORD = process.env.APP_PASSWORD;
const HOST = process.env.HOST;

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({
    name,
    email,
    password: await User.hashPassword(password),
  });

  try {
    const user = await newUser.save();
    res.json(user);
  } catch (err) {
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
    const user = await User.findById(req.body.userId);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.fullName = req.body.fullName || user.fullName;
      user.address = req.body.address || user.address;
      user.city = req.body.city || user.city;
      user.postalCode = req.body.postalCode || user.postalCode;
      user.country = req.body.country || user.country;
      if (req.body.password) {
        user.password = User.hashSyncPassword(req.body.password);
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

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.send("L'utilisateur n'éxiste pas !");
    }
    const secret = JWT_SECRET + user.password;
    const token = JWT.sign({ email: user.email, id: user._id }, secret, {
      expiresIn: "5m",
    });
    const link = `${HOST}/api/users/reset-password/${user._id}/${token}`;
    console.log(link);
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "me94110@gmail.com",
        pass: APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: "youremail@gmail.com",
      to: email,
      subject: "Réinitialisation de mot de passe React-amazon-clone",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.json({
          message: `Problème rencontré lors de la réinitialisation du mot de passe, assurez vous que votre adresse soit une adresse gmail !`,
        });
      } else {
        console.log("Email sent: " + info.response);
        res.json({});
      }
    });
  } catch (error) {}
});

router.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.send("L'utilisateur n'éxiste pas !");
  }
  const secret = JWT_SECRET + user.password;
  try {
    const verify = JWT.verify(token, secret);
    res.render("index", { email: verify.email, status: "Not verified" });
  } catch (error) {
    console.log(error);
    res.send("Not verified");
  }
});

router.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + user.password;
  try {
    const verify = JWT.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );
    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});

module.exports = router;
