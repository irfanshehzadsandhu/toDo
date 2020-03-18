class ToDoHandler {
  async handle(command) {
    await command.execute();
  }
}

module.exports = ToDoHandler;
