const { CommandBus, LoggerMiddleware } = require("simple-command-bus");
const commandHandlerMiddleware = require("../../../../App/Application/utils/applicationBinding");
const CreateUserCommand = require("../../../../App/Application/user/createUserCommand");
const CurrentUserCommand = require("../../../../App/Application/user/currentUserCommand");
const handleError = require("../../../utils/handleError");

const commandBus = new CommandBus([
  new LoggerMiddleware(console),
  commandHandlerMiddleware
]);

exports.current = async (req, res) => {
  try {
    const { userID } = req.user.userID;
    const command = new CurrentUserCommand(userID);
    res.status(200).json(await commandBus.handle(command));
  } catch (e) {
    handleError(e, res);
  }
};

exports.create = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const command = new CreateUserCommand(name, email, password);
    res.status(200).json(await commandBus.handle(command));
  } catch (e) {
    handleError(e, res);
  }
};
