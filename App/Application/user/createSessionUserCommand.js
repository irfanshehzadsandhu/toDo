const { Command } = require("simple-command-bus");
class CreateSessionUserCommand extends Command {
  constructor(email, password) {
    super();
    this.email = email;
    this.password = password;
  }
  // write getter here.
  userDetails() {
    return {
      email: this.email,
      password: this.password
    };
  }
}
module.exports = CreateSessionUserCommand;
