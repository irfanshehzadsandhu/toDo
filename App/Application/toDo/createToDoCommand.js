const toDoService = require("../../../App/Domain/services/todo");
const { Command } = require("simple-command-bus");
class CreateToDoCommand extends Command {
  constructor(name, description, completed) {
    super();
    this.name = name;
    this.description = description;
    this.completed = completed;
  }
  toDoDetails() {
    return {
      name: this.name,
      description: this.description,
      completed: this.completed
    };
  }
}
module.exports = CreateToDoCommand;
