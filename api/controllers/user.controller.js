const User = require("../database/models/user.model");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const JWT_SECRET = process.env.JWT_SECRET;
const APP_PASSWORD = process.env.APP_PASSWORD;
const HOST = process.env.HOST;

const postUserController = async (req, res) => {
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
};
const putProfileController = async (req, res) => {
  const { userId, email, name, password } = req.body;
  const user = await User.findById(userId);
  try {
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.password = req.body.country || user.country;
      if (req.body.password) {
        user.password = await User.hashPassword(password);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      });
    } else {
      return res.json({ status: "L'utilisateur n'éxiste pas!" });
    }
  } catch (error) {
    console.error(error);
    res.json({
      status: "Problème rencontré lors de la mise à jour du profil !",
    });
  }
};

const forgotPasswordController = async (req, res) => {
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
        console.log("Email envoyé: " + info.response);
        res.json({});
      }
    });
  } catch (error) {}
};

const getResetPasswordController = async (req, res) => {
  const { id, token } = req.params;
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.send("L'utilisateur n'éxiste pas !");
  }
  const secret = JWT_SECRET + user.password;
  try {
    const verify = JWT.verify(token, secret);
    res.render("index", {
      email: verify.email,
      status: "Not verified",
      host: HOST,
    });
  } catch (error) {
    console.error(error);
    res.send("Not verified");
  }
};

const postResetPasswordController = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.json({ status: "L'utilisateur n'éxiste pas!" });
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
    res.render("index", {
      email: verify.email,
      status: "verified",
      host: HOST,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "Quelque chose c'est mal passé !" });
  }
};

module.exports = {
  postUserController,
  putProfileController,
  forgotPasswordController,
  getResetPasswordController,
  postResetPasswordController,
};
