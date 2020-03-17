const { Command } = require("simple-command-bus");
class CreateToDoCommand extends Command {
  constructor(description, completed) {
    super();
    this.description = description;
    this.completed = completed;
  }
}
module.exports = CreateToDoCommand;
