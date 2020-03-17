const userService = require("../../../services/user");

class UpdatePasswordUserHandler {
  async handle(command) {
    return await userService.updatePassword(command);
  }
}

module.exports = UpdatePasswordUserHandler;
