const handleError = require("../utils/handleError");
const JwtAuthService = require("../../App/Infrastructure/services/jwtAuthService");
const jwtAuthService = new JwtAuthService();

module.exports = async function (req, res, next) {
  try {
    const isAuthorized = await jwtAuthService.userHasAuthorization(req);
    if (!isAuthorized) {
      handleError("You need to sign in or you are not authorized for this action", res);
    }
    next();
  } catch (ex) {
    handleError(ex, res);
  }
};