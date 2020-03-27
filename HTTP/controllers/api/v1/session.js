const { CommandBus, LoggerMiddleware } = require("simple-command-bus");
const applicationBinding = require("../../../../App/Application/utils/applicationBinding");
const CreateSessionUserCommand = require("../../../../App/Application/user/createSessionUserCommand");
const AuthUserCommand = require("../../../../App/Application/user/authUserCommand");
const GoogleAuthentication = require("../../../utils/googleAuthentication");
const handleError = require("../../../utils/handleError");

const commandBus = new CommandBus([
  new LoggerMiddleware(console),
  applicationBinding
]);

exports.create = async (req, res) => {
  try {
    const { email, password } = req.body;
    const command = new CreateSessionUserCommand(email, password);
    res.status(200).json(await commandBus.handle(command));
  } catch (e) {
    handleError(e, res);
  }
};

exports.googleAuth = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const command = new AuthUserCommand(name, email, password);
    res.status(200).json(await commandBus.handle(command));
  } catch(e) {
    handleError(e,res);
  }
};

// I am generating url for google Authentication.
exports.googleUrl = (req, res) => {
  const googleAuthentication = new GoogleAuthentication();
  res.send(googleAuthentication.getConnectionUrl());
};