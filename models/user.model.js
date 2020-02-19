const Joi = require("joi");
const mongoose = require("mongoose");

let UserSchema = require("../schemas/user.schema");
const User = mongoose.model("User", UserSchema);

//function to validate user
function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required()
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
