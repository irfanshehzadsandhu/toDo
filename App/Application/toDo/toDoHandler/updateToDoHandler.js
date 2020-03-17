const toDoService = require("../../../services/todo");

class UpdateToDoHandler {
  async handle(command) {
    return await toDoService.update(command);
  }
}

module.exports = UpdateToDoHandler;
