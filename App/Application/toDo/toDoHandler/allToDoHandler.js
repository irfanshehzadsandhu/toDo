const toDoService = require("../../../services/todo");

class AllToDoHandler {
  async handle(command) {
    return await toDoService.all(command);
  }
}

module.exports = AllToDoHandler;
