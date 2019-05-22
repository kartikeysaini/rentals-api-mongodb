const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const _ = require("lodash");

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).send("invalid email or password");

  const userPassword = await bcrypt.compare(req.body.password, user.password);

  if (!userPassword) return res.status(400).send("invalid email or password");

  const token = user.generateAuthToken();

  res.send(token);
});

function validateUser(req) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;
