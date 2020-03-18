const toDoService = require("../../../App/Domain/services/todo");
const CreateToDoCommand = require("./createToDoCommand");
const AllToDoCommand = require("./allToDoCommand");
const FindToDoCommand = require("./findToDoCommand");
const UpdateToDoCommand = require("./findToDoCommand");
const RemoveToDoCommand = require("./removeToDoCommand");
class ToDoHandler {
  async handle(command) {
    if (command instanceof CreateToDoCommand) {
      return await toDoService.create(command);
    }
    if (command instanceof AllToDoCommand) {
      return await toDoService.all(command);
    }
    if (command instanceof FindToDoCommand) {
      return await toDoService.find(command);
    }
    if (command instanceof UpdateToDoCommand) {
      return await toDoService.update(command);
    }
    if (command instanceof RemoveToDoCommand) {
      return await toDoService.remove(command);
    }
  }
}

module.exports = ToDoHandler;
