const jwt = require("jsonwebtoken");
const properties = require("../config/properties");
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
  //give different access rights if admin or not
  isAdmin: Boolean
});
//custom method to generate authToken
UserSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    properties.MYPRIVATEKEY
  ); //get the private key from the config file -> environment variable
  return token;
};
module.exports = UserSchema;
