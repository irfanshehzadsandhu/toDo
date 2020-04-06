const jwt = require("jsonwebtoken");
const JwtAuthService = require("../../App/Domain/services/jwtAuthService");
const handleError = require("../utils/handleError");
const jwtAuthService = new JwtAuthService();

module.exports.userIsAuthorized = async function (req, res, next) {
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

module.exports.validate = async function (req, res, next) {
  try {
    const { email, password } = req.body;
    res.status(200).json(await jwtAuthService.validateUserCredentials({ email: email, password: password }));
    next();
  } catch (e) {
    handleError(e, res);
  }
};
