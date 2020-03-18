const userService = require("../../../App/Domain/services/user");
const { Command } = require("simple-command-bus");
class CurrentUserCommand extends Command {
  constructor(userID) {
    super();
    this.userID = userID;
  }
  async execute() {
    return await userService.current(this);
  }
}
module.exports = CurrentUserCommand;
