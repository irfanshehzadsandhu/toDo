class ToDoHandler {
  async handle(command) {
    return await command.execute();
  }
}

module.exports = ToDoHandler;
