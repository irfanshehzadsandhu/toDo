const userService = require("../../../App/Domain/services/user");
const CreateUserCommand = require("./createUserCommand");
const CurrentUserCommand = require("./currentUserCommand");
const UpdatePasswordUserCommand = require("./updatePasswordUserCommand");
class UserHandler {
  async handle(command) {
    if (command instanceof CreateUserCommand) {
      return await userService.create(command);
    }
    if (command instanceof CurrentUserCommand) {
      return await userService.current(command);
    }
    if (command instanceof UpdatePasswordUserCommand) {
      return await userService.updatePassword(command);
    }
  }
}
module.exports = UserHandler;
