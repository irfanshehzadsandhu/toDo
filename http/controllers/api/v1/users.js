const { CommandBus, LoggerMiddleware } = require("simple-command-bus");
const commandHandlerMiddelware = require("../../../../command/handlers");
const createUserCommand = require("../../../../command/userCommand/createUserCommand");
const userService = require("../../../../services/user");
const handleError = require("../../../utils/handleError");

const commandBus = new CommandBus([
  new LoggerMiddleware(console),
  commandHandlerMiddelware
]);

exports.current = async (req, res) => {
  try {
    res.status(200).json(await userService.current(req.user.userID));
  } catch (e) {
    handleError(e, res);
  }
};

exports.create = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const command = new createUserCommand(name, email, password);
    res.status(200).json(await commandBus.handle(command));
  } catch (e) {
    handleError(e, res);
  }
};
