const uuidv1 = require("uuid/v1");
const bcrypt = require("bcrypt");
const { User, validate } = require("../../../models/user.model");
// Current User
exports.current = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
};
// Generate User
exports.create = async (req, res) => {
  // validate the request body first
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //find an existing user
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User({
    userID: uuidv1(),
    name: req.body.name,
    password: req.body.password,
    email: req.body.email
  });
  user.password = await bcrypt.hash(user.password, 10);
  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send({
    _id: user._id,
    name: user.name,
    email: user.email
  });
};
