const handleError = require("../utils/handleError");
const GoogleAuthService = require("../../App/Infrastructure/services/googleAuthService");
const googleAuthService = new GoogleAuthService();

module.exports = async function (req, res) {
  try {
    await googleAuthService.getGoogleAccountFromCode(req.query.code);
    //send res from her
  } catch (e) {
    handleError(e, res);
  }
};
