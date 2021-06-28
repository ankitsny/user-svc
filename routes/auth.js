const { Router } = require("express");
const User = require("../models/users.model");
const { compare } = require("../utils/bcrypt");
const { getClaims, sign } = require("../utils/jwt");

const router = Router();

router.post("/login", async (req, res) => {
  const payload = req.body || {};
  if (!payload.userId || !payload.password) {
    return res.status(400).send({ msg: "User Id or password missing" });
  }

  const user = await User.findOne({ userId: payload.userId }).exec();
  if (!user) {
    return res.status(401).send({ msg: "User Id or Password is incorrect!!!" });
  }
  const isValid = await compare(payload.password, user.password);
  if (!isValid) {
    return res.status(401).send({ msg: "User Id or Password is incorrect!!!" });
  }
  const token = sign({ userId: payload.userId });
  return res.status(200).send({ msg: "Logged in", token });
});

router.post("/logout", async (req, res) => {
  return res.status(200).send({ msg: "Logged out" });
});

module.exports = router;
