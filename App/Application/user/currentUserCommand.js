const userService = require("../../../App/Domain/services/user");
const { Command } = require("simple-command-bus");
class CurrentUserCommand extends Command {
  constructor(userID) {
    super();
    this.userID = userID;
  }
  userDetails() {
    return this.userID;
  }
}
module.exports = CurrentUserCommand;
