const GoogleAuthService = require("../../../../App/Domain/services/googleAuthService");
const { CommandBus, LoggerMiddleware } = require("simple-command-bus");
const applicationBinding = require("../../../../App/Application/utils/applicationBinding");
const AuthUserCommand = require("../../../../App/Application/user/authUserCommand");
const handleError = require("../../../utils/handleError");

const commandBus = new CommandBus([
  new LoggerMiddleware(console),
  applicationBinding
]);

exports.create = async (req, res) => {

};

exports.googleAuth = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const command = new AuthUserCommand(name, email, password);
    res.status(200).json(await commandBus.handle(command));
  } catch (e) {
    handleError(e, res);
  }
};

// I am generating url for google Authentication.
exports.googleUrl = (req, res) => {
  const googleAuthService = new GoogleAuthService();
  res.send(googleAuthService.getConnectionUrl());
};