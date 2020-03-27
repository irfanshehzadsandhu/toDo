const userService = require("../../../App/Domain/services/user");
class UserHandler {
  async handleCreateUserCommand(command) {
    return await userService.create(command.userDetails());
  }
  async handleCurrentUserCommand(command) {
    return await userService.current(command.userDetails());
  }
  async handleCurrentSessionUserCommand(command) {
    return await userService.createSession(command.userDetails());
  }
  async handleAuthUserCommand(command) {
    return await userService.authUser(command.userDetails());
  }
}

module.exports = UserHandler;
