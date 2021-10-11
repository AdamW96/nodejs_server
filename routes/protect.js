const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models").userModel;
const jwt = require("jsonwebtoken");

router.use((req, res, next) => {
  console.log("a request is coming to the protect part");
  next();
});

router.post("/", (req, res) => {
  return res.status(200).send(req.body);
});

module.exports = router;
