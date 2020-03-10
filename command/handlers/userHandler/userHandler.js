module.exports = class UserHandler {
  handle(command) {
    console.log("User Handler");
    command.create();
  }
};
