const jwt = require("jsonwebtoken");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send("Invalid email or password");
  let { email, password } = req.body;
  if (email === "admin@drapcode.com" && password === "admin") {
    const token = jwt.sign({ sub: req.body.email }, "test_jwtPrivateKey", {
      expiresIn: "3days",
    });
    return res.status(200).send({ token: token, username: email });
  }
  return res.status(400).send("Invalid email or password");
});

function validate(req) {
  const schema = {
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  };
  return Joi.validate(req, schema);
}

module.exports = router;
