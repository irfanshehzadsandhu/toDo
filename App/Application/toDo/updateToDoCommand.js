const toDoService = require("../../../App/Domain/services/todo");
const { Command } = require("simple-command-bus");
class UpdateToDoCommand extends Command {
  constructor(toDoID, description, completed) {
    super();
    this.toDoID = toDoID;
    this.description = description;
    this.completed = completed;
  }
  toDoDetails() {
    return {
      toDoID: this.toDoID,
      description: this.description,
      completed: this.completed
    };
  }
}
module.exports = UpdateToDoCommand;
