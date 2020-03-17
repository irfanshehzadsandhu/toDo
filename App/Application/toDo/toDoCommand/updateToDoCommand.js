const { Command } = require("simple-command-bus");
class UpdateToDoCommand extends Command {
  constructor(toDoID, description, completed) {
    super();
    this.toDoID = toDoID;
    this.description = description;
    this.completed = completed;
  }
}
module.exports = UpdateToDoCommand;
