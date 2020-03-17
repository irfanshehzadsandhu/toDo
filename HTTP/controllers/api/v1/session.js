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

exports.googleUrl = (req, res) => {
  res.send(googleAuth.googleUrl());
};

exports.googleAuth = async (req, res) => {
  const response = await googleAuth.getGoogleAccountFromCode(req.query.code);
  console.log(response);
  res.send("Rogger");
};
