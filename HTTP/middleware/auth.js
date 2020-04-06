const jwt = require("jsonwebtoken");
const JwtAuthService = require("../../App/Domain/services/jwtAuthService");
const handleError = require("../utils/handleError");
const jwtAuthService = new JwtAuthService();

module.exports.userIsAuthorized = async function (req, res, next) {
  try {
    await jwtAuthService.userHasAuthorization(req);
    next();
  } catch (ex) {
    handleError({ message: ex }, res);
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
