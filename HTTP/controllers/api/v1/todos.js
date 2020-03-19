const { CommandBus, LoggerMiddleware } = require("simple-command-bus");
const commandHandlerMiddelware = require("../../../../App/Application/utils/applicationBinding");
const CreateToDoCommand = require("../../../../App/Application/toDo/createToDoCommand");
const AllToDoCommand = require("../../../../App/Application/toDo/allToDoCommand");
const FindToDoCommand = require("../../../../App/Application/toDo/findToDoCommand");
const UpdateToDoCommand = require("../../../../App/Application/toDo/updateToDoCommand");
const RemoveToDoCommand = require("../../../../App/Application/toDo/removeToDoCommand");
const handleError = require("../../../utils/handleError");

const commandBus = new CommandBus([
  new LoggerMiddleware(console),
  commandHandlerMiddelware
]);

exports.find = async (req, res) => {
  try {
    const { toDoID } = req.toDoID;
    const command = new FindToDoCommand(toDoID);
    res.status(200).json(await commandBus.handle(command));
  } catch (e) {
    handleError(e, res);
  }
};

exports.all = async (req, res) => {
  try {
    const { page, completed, limit } = req.query;
    const command = new AllToDoCommand(page, completed, limit);
    res.status(200).json(await commandBus.handle(command));
  } catch (e) {
    handleError(e, res);
  }
};

exports.create = async (req, res) => {
  try {
    const { description, completed } = req.body;
    const command = new CreateToDoCommand(description, completed);
    res.status(200).json(await commandBus.handle(command));
  } catch (e) {
    handleError(e, res);
  }
};

exports.update = async (req, res) => {
  try {
    const { toDoID, description, completed } = req.body;
    const command = new UpdateToDoCommand(
      toDoID,
      description,
      Boolean(completed)
    );
    res.status(200).json(await commandBus.handle(command));
  } catch (e) {
    handleError(e, res);
  }
};

exports.destroy = async (req, res) => {
  try {
    const { toDoID } = req.toDoID;
    const command = new RemoveToDoCommand(toDoID);
    res.status(200).json(await commandBus.handle(command));
  } catch (e) {
    handleError(e, res);
  }
};
