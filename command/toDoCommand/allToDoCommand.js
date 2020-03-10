const { Command } = require("simple-command-bus");
class AllToDoCommand extends Command {
  constructor(page, completed) {
    super();
    this.page = page;
    this.completed = completed;
  }
}
module.exports = AllToDoCommand;
