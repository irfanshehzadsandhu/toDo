const userService = require("../../../../App/Domain/services/user");
const handleError = require("../../../utils/handleError");
const googleAuth = require("../../../middleware/googleAuth");
exports.create = async (req, res) => {
  try {
    res.status(200).json(await userService.createSession(req.body));
  } catch (e) {
    handleError(e, res);
  }
};

exports.googleAuth = async (req, res) => {
  try{
    const userInfo = await googleAuth.getGoogleAccountFromCode(req.query.code);
    res.status(200).json(await userService.authUser(userInfo));
  }catch(e){
    handleError(e,res);
  }
};

// I am generating url for google Authentication.
exports.googleUrl = (req, res) => {
  res.send(googleAuth.googleUrl());
};