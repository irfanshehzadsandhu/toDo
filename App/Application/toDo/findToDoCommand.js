const toDoService = require("../../../App/Domain/services/todo");
const { Command } = require("simple-command-bus");
class FindToDoCommand extends Command {
  constructor(toDoID) {
    super();
    this.toDoID = toDoID;
  }
  async execute() {
    return await toDoService.find(this);
  }
}
module.exports = FindToDoCommand;
