const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  lastname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// mogondb function
userSchema.methods.comparePassword = function (password) {
  if (password === this.password) {
    return true;
  } else {
    return false;
  }
};

module.exports = mongoose.model("User", userSchema);
