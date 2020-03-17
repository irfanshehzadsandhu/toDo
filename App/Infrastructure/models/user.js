const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  createdAt: { type: Date, default: Date.now },
  //give different access rights if admin or not
  isAdmin: Boolean
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
