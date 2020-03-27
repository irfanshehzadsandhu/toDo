const GoogleAuthentication = require("../utils/googleAuthentication");
const handleError = require("../utils/handleError");

module.exports = async function(req, res, next) {
  try {
    const googleAuthentication = new GoogleAuthentication();
    const userInfo = await googleAuthentication.getGoogleAccountFromCode(req.query.code);
    req.body.name = userInfo.name;
    req.body.email = userInfo.email;
    req.body.password = userInfo.password;
    next();
  } catch (ex) {
    handleError({ message: "Access denied. Invalid Code." }, res);
  }
};
