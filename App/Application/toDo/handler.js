const toDoService = require("../../../App/Domain/services/todo");
class ToDoHandler {
  async handleAllToDoCommand(command) {
    return await toDoService.all(command.toDoDetails());
  }
  async handleCreateToDoCommand(command) {
    return await toDoService.create(command.toDoDetails());
  }
  async handleFindToDoCommand(command) {
    return await toDoService.find(command.toDoDetails());
  }
  async handleUpdateToDoCommand(command) {
    return await toDoService.update(command.toDoDetails());
  }
  async handleRemoveToDoCommand(command) {
    return await toDoService.remove(command.toDoDetails());
  }
}

module.exports = ToDoHandler;
