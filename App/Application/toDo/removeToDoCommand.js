const toDoService = require("../../../App/Domain/services/todo");
const { Command } = require("simple-command-bus");
class RemoveToDoCommand extends Command {
  constructor(toDoID) {
    super();
    this.toDoID = toDoID;
  }
  async execute() {
    return await toDoService.remove(this);
  }
}
module.exports = RemoveToDoCommand;
