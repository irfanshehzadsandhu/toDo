const userService = require("../../../../services/user");
const googleAuth = require("../../../middleware/googleAuth");
const logger = require("../../../logs");
exports.create = async (req, res) => {
  try {
    res.send(await userService.createSession(req.body));
  } catch (e) {
    logger.debug(e);
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
