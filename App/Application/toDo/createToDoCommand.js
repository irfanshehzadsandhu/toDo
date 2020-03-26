const toDoService = require("../../../App/Domain/services/todo");
const { Command } = require("simple-command-bus");
class CreateToDoCommand extends Command {
  constructor(description, completed) {
    super();
    this.description = description;
    this.completed = completed;
  }
  toDoDetails() {
    return {
      description: this.description,
      completed: this.completed
    };
  }
}
module.exports = CreateToDoCommand;
