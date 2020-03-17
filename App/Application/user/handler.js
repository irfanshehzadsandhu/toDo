const userService = require("../../../App/Domain/services/user");

class UserHandler {
  async handle(command) {
    return await userService.create(command);
  }
}

module.exports = UserHandler;

// class CurrentUserHandler {
//   async handle(command) {
//     return await userService.current(command);
//   }
// }

// module.exports = CurrentUserHandler;
