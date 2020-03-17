const { Command } = require("simple-command-bus");
class CurrentUserCommand extends Command {
  constructor(userID) {
    super();
    this.userID = userID;
  }
}
module.exports = CurrentUserCommand;
