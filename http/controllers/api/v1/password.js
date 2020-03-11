const { CommandBus, LoggerMiddleware } = require("simple-command-bus");
const commandHandlerMiddleware = require("../../../../command/handlers");
const updatePasswordUserCommand = require("../../../../command/userCommand/updatePasswordUserCommand");
const handleError = require("../../../utils/handleError");

const commandBus = new CommandBus([
  new LoggerMiddleware(console),
  commandHandlerMiddleware
]);
exports.update = async (req, res) => {
  try {
    const { userID, password } = req.body;
    const command = new updatePasswordUserCommand(userID, password);
    res.status(200).json(await commandBus.handle(command));
  } catch (e) {
    handleError(e, res);
  }
};
