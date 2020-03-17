const { Command } = require("simple-command-bus");
class FindToDoCommand extends Command {
  constructor(toDoID) {
    super();
    this.toDoID = toDoID;
  }
}
module.exports = FindToDoCommand;
