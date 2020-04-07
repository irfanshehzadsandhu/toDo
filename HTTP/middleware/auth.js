const jwt = require("jsonwebtoken");
const JwtAuthService = require("../../App/Infrastructure/services/jwtAuthService");
const GoogleAuthService = require("../../App/Infrastructure/services/googleAuthService");
const handleError = require("../utils/handleError");
const jwtAuthService = new JwtAuthService();
const googleAuthService = new GoogleAuthService();

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

module.exports.googleAuth = async function (req, res, next) {
  try {
    const userInfo = await googleAuthService.getGoogleAccountFromCode(req.query.code);
    req.body.name = userInfo.name;
    req.body.email = userInfo.email;
    req.body.password = userInfo.password;
    next();
  } catch (ex) {
    handleError({ message: "Access denied. Invalid Code." }, res);
  }
};
