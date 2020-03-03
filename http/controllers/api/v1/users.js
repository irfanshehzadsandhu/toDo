// Current User
const userService = require("../../../../services/user");
const handleError = require("../../../utils/handleError");
exports.current = async (req, res) => {
  try {
    res.status(200).json(await userService.current(req.user.userID));
  } catch (e) {
    handleError(e, res);
  }
};

exports.create = async (req, res) => {
  try {
    res.status(200).json(await userService.create(req.body));
  } catch (e) {
    handleError(e, res);
  }
};
