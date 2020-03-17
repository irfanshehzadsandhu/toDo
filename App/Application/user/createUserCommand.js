const { Command } = require("simple-command-bus");
class CreateUserCommand extends Command {
  constructor(name, email, password) {
    super();
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
module.exports = CreateUserCommand;
