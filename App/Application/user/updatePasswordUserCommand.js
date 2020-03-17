const { Command } = require("simple-command-bus");
class UpdatePasswordUserCommand extends Command {
  constructor(userID, password) {
    super();
    this.userID = userID;
    this.password = password;
  }
}
module.exports = UpdatePasswordUserCommand;
