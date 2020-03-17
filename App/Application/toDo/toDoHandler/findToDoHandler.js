const toDoService = require("../../../services/todo");

class FindToDoHandler {
  async handle(command) {
    return await toDoService.find(command);
  }
}

module.exports = FindToDoHandler;
