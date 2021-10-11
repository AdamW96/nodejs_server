const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models").userModel;
const jwt = require("jsonwebtoken");

router.use((req, res, next) => {
  console.log("a request is coming");
  next();
});

router.get("/testAPI", (req, res) => {
  const msgObj = {
    message: "Test API is working",
  };
  return res.json(msgObj);
});

router.post("/register", async (req, res) => {
  console.log("Register");
  console.log(registerValidation(req.body));
  const { error } = registerValidation(req.body);
  console.log(error);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email has already existed");
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).send({
      msg: "success",
      savedObject: savedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send("user not save");
  }
});

router.post("/signin", (req, res) => {
  //check the validation of the data
  console.log("a request come to signin route");
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      res.status(400).send(err);
    }
    if (!user) {
      res.status(401).send("user not found");
    } else {
      let index = user.comparePassword(req.body.password);
      if (index === true) {
        const tokenObject = { _id: user._id, email: user.email };
        const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
        res.send({ success: true, token: "JWT " + token, user });
      } else {
        console.log(err);
        res.status(401).send("wrong password or email");
      }
    }
  });
});

module.exports = router;
