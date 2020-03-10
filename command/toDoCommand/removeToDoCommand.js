const { Command } = require("simple-command-bus");
class RemoveToDoCommand extends Command {
  constructor(toDoID) {
    super();
    this.toDoID = toDoID;
  }
}
module.exports = RemoveToDoCommand;
