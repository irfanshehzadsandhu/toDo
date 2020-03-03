const userService = require("../../../../services/user");
const handleError = require("../../../utils/handleError");
exports.update = async (req, res) => {
  try {
    res.status(200).json(await userService.updatePassword(req.body));
  } catch (e) {
    handleError(e, res);
  }
};
