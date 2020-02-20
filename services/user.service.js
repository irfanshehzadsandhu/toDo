const jwt = require("jsonwebtoken");
const configuration = require("../config");
const uuidv1 = require("uuid/v1");
const bcrypt = require("bcrypt");
const validate = require("../validators/user.validator");
const User = require("../models/user.model");
exports.current = (req, res) => {
  const user = User.findById(req.user._id).select("-password");
  return user;
};

exports.create = async (req, res) => {
  // validate the request body first
  const { error } = validate(req.body);
  //if (error) return res.status(400).send(error.details[0].message);
  if (error) {
    return { status: 400, message: error.details[0].message };
  }

  //find an existing user
  let user = await User.findOne({ email: req.body.email });
  //if (user) return res.status(400).send("User already registered.");
  if (user) {
    return { status: 400, message: "User already registered." };
  }
  user = new User({
    userID: uuidv1(),
    name: req.body.name,
    password: req.body.password,
    email: req.body.email
  });
  user.password = await bcrypt.hash(user.password, 10);
  await user.save();
  return { status: 200, message: "User created successfully.", user: user };
};

exports.generateAuthToken = user => {
  const token = jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    configuration.MYPRIVATEKEY
  );
  return token;
};
