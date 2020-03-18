const toDoService = require("../../../App/Domain/services/todo");
const { Command } = require("simple-command-bus");
class UpdateToDoCommand extends Command {
  constructor(toDoID, description, completed) {
    super();
    this.toDoID = toDoID;
    this.description = description;
    this.completed = completed;
  }
  async execute() {
    return await toDoService.update(this);
  }
}
module.exports = UpdateToDoCommand;
