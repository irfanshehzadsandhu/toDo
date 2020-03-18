const { Command } = require("simple-command-bus");
const userService = require("../../../App/Domain/services/user");
class CreateUserCommand extends Command {
  constructor(name, email, password) {
    super();
    this.name = name;
    this.email = email;
    this.password = password;
  }
  async execute() {
    return await userService.create(this);
  }
}
module.exports = CreateUserCommand;
