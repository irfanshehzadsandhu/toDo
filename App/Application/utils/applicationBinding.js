const {
  CommandHandlerMiddleware,
  ClassNameExtractor,
  InMemoryLocator,
  HandleInflector
} = require("simple-command-bus");
const ToDoHandler = require("../toDo/toDoHandler");

const UserHandler = require("../user/handler");
//Consider middlerware as a waiter , accepting orders from different clients and pass these orders to chef to cook food for clients
const commandHandlerMiddleware = new CommandHandlerMiddleware(
  new ClassNameExtractor(),
  new InMemoryLocator({
    CreateToDoHandler: new ToDoHandler(),
    AllToDoHandler: new ToDoHandler(),
    FindToDoHandler: new ToDoHandler(),
    UpdateToDoHandler: new ToDoHandler(),
    RemoveToDoHandler: new ToDoHandler(),
    CreateUserHandler: new UserHandler(),
    CurrentUserHandler: new UserHandler(),
    UpdatePasswordUserHandler: new UserHandler()
  }),
  new HandleInflector()
);

module.exports = commandHandlerMiddleware;
