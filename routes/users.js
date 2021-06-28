var express = require("express");
var router = express.Router();
const User = require("../models/users.model");
const { hash } = require("../utils/bcrypt");
const { getClaims } = require("../utils/jwt");

/* GET users listing. */

router.get("/me", async (req, res) => {
  const { token } = req.headers;
  if (!token) {
    return res
      .status(400)
      .send({ msg: "Please login", error: "Token missing" });
  }
  const { err, claims } = await getClaims(token);
  if (err) {
    return res.status(401).send({
      msg: "Token expired, please login again",
      error: "Token expired",
    });
  }
  const user = await User.findOne({ userId: claims.userId }).exec();
  return res.status(200).send({ data: user });
});

router
  .route("/:id?")
  .get(async (req, res) => {
    const { id } = req.params;
    if (!id) {
      const users = await User.find({}).exec();
      return res.status(200).send({ data: users });
    }
    const user = await User.findOne({ userId: id }).exec();
    return res.status(200).send({ data: user });
  })
  .post(async (req, res) => {
    const { id } = req.params;
    if (id) {
      const error = new Error("Invalid api signature");
      return res.status(400).send({
        error: error.toString(),
        msg: "Bad Request",
      });
    }
    try {
      const user = new User(req.body);

      const eUser = await User.findOne({ userId: user.userId }).exec();
      if (eUser)
        return res
          .status(400)
          .send({ msg: "User Id not available", error: "User ID Taken" });

      user.password = await hash(user.password);
      const newUser = await user.save();
      return res.status(201).send({ data: newUser, msg: "User Created" });
    } catch (error) {
      return res
        .status(500)
        .send({ error: error.toString(), msg: "Something went wrong!!!" });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    if (!id)
      return res.status(400).send({
        error: new Error("Invalid api signature").toString(),
        msg: "User id missing",
      });

    const { token } = req.headers;
    if (!token) {
      return res
        .status(400)
        .send({ msg: "Please login", error: "Token missing" });
    }
    const { err } = await getClaims(token);
    if (err) {
      return res.status(401).send({
        msg: "Token expired, please login again",
        error: "Token expired",
      });
    }

    try {
      await User.deleteOne({ userId: id });
      return res.status(200).send({ msg: "User Deleted" });
    } catch (error) {
      return res.status(500).send({ error, msg: "Failed to delete the user" });
    }
  });

module.exports = router;
