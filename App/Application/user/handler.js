class UserHandler {
  async handle(command) {
    await command.execute();
  }
}
module.exports = UserHandler;
