const userService = require("../../../services/user");

class CreateUserHandler {
  async handle(command) {
    return await userService.create(command);
  }
}

module.exports = CreateUserHandler;
