const {
  CommandHandlerMiddleware,
  ClassNameExtractor,
  InMemoryLocator,
  HandleInflector
} = require("simple-command-bus");
const CreateToDoHandler = require("./toDoHandler/createToDoHandler");
const AllToDoHandler = require("./toDoHandler/allToDoHandler");
const FindToDoHandler = require("./toDoHandler/findToDoHandler");
const UpdateToDoHandler = require("./toDoHandler/updateToDoHandler");
const RemoveToDoHandler = require("./toDoHandler/removeToDoHandler");

const CreateUserHandler = require("./userHandler/createUserHandler");
const CurrentUserHandler = require("./userHandler/currentUserHandler");
const UpdatePasswordUserHandler = require("./userHandler/updatePasswordUserHandler");
//Consider middlerware as a waiter , accepting orders from different clients and pass these orders to chef to cook food for clients
const commandHandlerMiddleware = new CommandHandlerMiddleware(
  new ClassNameExtractor(),
  new InMemoryLocator({
    CreateToDoHandler: new CreateToDoHandler(),
    AllToDoHandler: new AllToDoHandler(),
    FindToDoHandler: new FindToDoHandler(),
    UpdateToDoHandler: new UpdateToDoHandler(),
    RemoveToDoHandler: new RemoveToDoHandler(),
    CreateUserHandler: new CreateUserHandler(),
    CurrentUserHandler: new CurrentUserHandler(),
    UpdatePasswordUserHandler: new UpdatePasswordUserHandler()
  }),
  new HandleInflector()
);

module.exports = commandHandlerMiddleware;
