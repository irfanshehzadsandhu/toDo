// Current User
const userService = require("../../../../services/user");
const logger = require("../../../logs");
exports.current = async (req, res) => {
  try {
    res.send(await userService.current(req.user.userID));
  } catch (e) {
    logger.debug(e);
  }
};

exports.create = async (req, res) => {
  try {
    res.send(await userService.create(req.body));
  } catch (e) {
    logger.debug(e);
  }
};
