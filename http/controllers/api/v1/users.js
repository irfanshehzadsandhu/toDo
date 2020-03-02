// Current User
const userService = require("../../../../services/user");
exports.current = async (req, res) => {
  try {
    res.send(await userService.current(req.user.userID));
  } catch (e) {
    res.send("Something went wrong.");
  }
};

exports.create = async (req, res) => {
  try {
    res.send(await userService.create(req.body));
  } catch (e) {
    res.send("Something went wrong.");
  }
};
