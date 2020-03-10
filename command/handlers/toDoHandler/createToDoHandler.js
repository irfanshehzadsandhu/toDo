const toDoService = require("../../../services/todo");

class CreateToDoHandler {
  async handle(command) {
    return await toDoService.create(command);
  }
}

module.exports = CreateToDoHandler;
