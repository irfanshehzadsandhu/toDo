const toDoService = require("../../../services/todo");

class RemoveToDoHandler {
  async handle(command) {
    return await toDoService.remove(command);
  }
}

module.exports = RemoveToDoHandler;
