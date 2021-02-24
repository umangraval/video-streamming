const express = require("express");
const bcrypt = require("bcryptjs");
const { User } = require("../model/User");

const app = express();
const isLoggedInValidator = require("../validation/isLoggedInValidator");
const notLoggedInValidator = require("../validation/notLoggedInValidator");
//= =========================================================================

app.post("/register", isLoggedInValidator, async (req, res) => {
  try {
    const { username, password } = req.body;
    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json("registered");

    let newUser = new User({
      username
    });
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_LENGTH));
    const hash = await bcrypt.hash(password, salt);

    newUser.password = hash;
    newUser = await newUser.save();
    req.session.userId = newUser._id;
    const payload = {
      _id: newUser._id,
      username: newUser.username
    };
    res.json(payload);
  } catch (e) {
    console.log("Error", e);
  }
});

app.post("/login", isLoggedInValidator, async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).lean();
    if (!user) return res.status(404).json("usernameNotFound");

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) return res.status(400).json("passwordIncorrect");

    req.session.userId = user._id;
    const payload = {
      _id: user._id,
      username: user.username
    };
    res.json(payload);
  } catch (e) {
    console.log("Error", e);
  }
});

app.post("/logout", notLoggedInValidator, (req, res) => {
  try {
    req.session.destroy(err => {
      if (err) return res.status(400).json("logoutError");

      res.clearCookie(process.env.SESS_NAME);
      res.json("logoutSuccess");
    });
  } catch (e) {
    console.log("Error", e);
  }
});

module.exports = app;
