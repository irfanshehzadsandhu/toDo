const { CommandBus, LoggerMiddleware } = require("simple-command-bus");
const commandHandlerMiddelware = require("../../../../command/handlers");
const createToDoCommand = require("../../../../command/toDoCommand/createToDoCommand");
const allToDoCommand = require("../../../../command/toDoCommand/allToDoCommand");
const findToDoCommand = require("../../../../command/toDoCommand/findToDoCommand");
const toDoService = require("../../../../services/todo");
const handleError = require("../../../utils/handleError");

const commandBus = new CommandBus([
  new LoggerMiddleware(console),
  commandHandlerMiddelware
]);

exports.find = async (req, res) => {
  try {
    const { toDoID } = req.toDoID;
    const command = new findToDoCommand(toDoID);
    res.status(200).json(await commandBus.handle(command));
    //res.status(200).json(await toDoService.find(req.toDoID));
  } catch (e) {
    handleError(e, res);
  }
};

exports.all = async (req, res) => {
  try {
    const { page, completed } = req.query;
    const command = new allToDoCommand(page, completed);
    res.status(200).json(await commandBus.handle(command));
  } catch (e) {
    handleError(e, res);
  }
};

exports.create = async (req, res) => {
  try {
    const { description, completed } = req.body;
    const command = new createToDoCommand(description, completed);
    res.status(200).json(await commandBus.handle(command));
  } catch (e) {
    handleError(e, res);
  }
};

exports.update = async (req, res) => {
  try {
    res.status(200).json(await toDoService.update(req.body));
  } catch (e) {
    handleError(e, res);
  }
};

exports.destroy = async (req, res) => {
  try {
    res.status(200).json(await toDoService.remove(req.body));
  } catch (e) {
    handleError(e, res);
  }
};
