const express = require("express");
const router = require("express").Router();
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const protectRoute = require("./routes").protect;
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");
const port = process.env.PORT || 8080;
//connect to mongodb
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connect to mongodb!");
  })
  .catch((err) => {
    console.log(err);
  });
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  "/",
  router.get("/", (req, res, next) => {
    res.send("hello, this is nodejs server");
  })
);
app.use("/api/user", authRoute);
app.use(
  "/api/protect",
  passport.authenticate("jwt", { session: false }),
  protectRoute
);

app.listen(port, () => {
  console.log("Server running on port 8080");
});
