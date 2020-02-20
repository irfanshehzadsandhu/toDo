const User = require("../models/user.model");
exports.current = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
};
