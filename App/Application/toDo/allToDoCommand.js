const toDoService = require("../../../App/Domain/services/todo");
const { Command } = require("simple-command-bus");
class AllToDoCommand extends Command {
  constructor(page, completed) {
    super();
    this.page = page;
    this.completed = completed;
  }
  async execute() {
    return await toDoService.all(this);
  }
}
module.exports = AllToDoCommand;
