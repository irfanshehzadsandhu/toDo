const userService = require("../../../../services/user");

exports.create = async (req, res) => {
  try {
    res.send(await userService.createSession(req.body));
  } catch (e) {
    res.send("Something went wrong.");
  }
};