const toDoService = require("../../../App/Domain/services/todo");
const { Command } = require("simple-command-bus");
class RemoveToDoCommand extends Command {
  constructor(toDoID) {
    super();
    this.toDoID = toDoID;
  }
  toDoDetails() {
    return {
      toDoID: this.toDoID
    };
  }
}
module.exports = RemoveToDoCommand;
