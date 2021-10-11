const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const protectRoute = require("./routes").protect;
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");

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
app.use("/api/user", authRoute);
app.use(
  "/api/protect",
  passport.authenticate("jwt", { session: false }),
  protectRoute
);

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
