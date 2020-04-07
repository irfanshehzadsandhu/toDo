const handleError = require("../utils/handleError");
const GoogleAuthService = require("../../App/Infrastructure/services/googleAuthService");
const googleAuthService = new GoogleAuthService();

module.exports = async function (req, res) {
  try {
    const user = await googleAuthService.getGoogleAccountFromCode(req.query.code);
    res.status(200).json(user);
  } catch (e) {
    handleError(e, res);
  }
};

module.exports.googleAuthUrl = async function (req, res) {
  try {
    const googleAuthService = new GoogleAuthService();
    res.send(googleAuthService.getConnectionUrl());
  } catch (e) {
    handleError(e, res);
  }
};