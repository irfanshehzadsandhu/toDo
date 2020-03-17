const userService = require("../../../services/user");

class CurrentUserHandler {
  async handle(command) {
    return await userService.current(command);
  }
}

module.exports = CurrentUserHandler;
