const userService = require("../../../../services/user");
const logger = require("../../../logs");
exports.update = async (req, res) => {
  try {
    res.send(await userService.updatePassword(req.body));
  } catch (e) {
    logger.debug(e);
  }
};
