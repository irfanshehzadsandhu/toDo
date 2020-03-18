class UserHandler {
  async handle(command) {
    return await command.execute();
  }
}
module.exports = UserHandler;
