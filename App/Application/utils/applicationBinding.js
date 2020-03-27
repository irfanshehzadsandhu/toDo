const {
  CommandHandlerMiddleware,
  ClassNameExtractor,
  InMemoryLocator,
  //HandleInflector //It only handles handle method.
} = require("simple-command-bus");
const ClassNameInflector = require("./classNameInflector");
const ToDoHandler = require("../toDo/handler");
const UserHandler = require("../user/handler");
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
    UpdatePasswordUserHandler: new UserHandler(),
    CreateSessionUserHandler: new UserHandler(),
    AuthUserHandler: new UserHandler()
  }),
  new ClassNameInflector()
);

module.exports = commandHandlerMiddleware;
