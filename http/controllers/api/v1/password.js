const userService = require("../../../../services/user");

exports.update = async (req, res) => {
  try {
    res.send(await userService.updatePassword(req.body));
  } catch (e) {
    console.log(e);
    res.send("Something went wrong.");
  }
};
