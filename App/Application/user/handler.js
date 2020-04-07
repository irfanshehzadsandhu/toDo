const userService = require("../../../App/Domain/services/user");
class UserHandler {
  async handleCreateUserCommand(command) {
    return await userService.create(command.userDetails());
  }
}

module.exports = UserHandler;
