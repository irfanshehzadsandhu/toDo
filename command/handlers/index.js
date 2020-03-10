const {
  CommandHandlerMiddleware,
  ClassNameExtractor,
  InMemoryLocator,
  HandleInflector
} = require("simple-command-bus");
const CreateToDoHandler = require("./toDoHandler/createToDoHandler");
const AllToDoHandler = require("./toDoHandler/allToDoHandler");
const FindToDoHandler = require("./toDoHandler/findToDoHandler");
//Consider middlerware as a waiter , accepting orders from different clients and pass these orders to chef to cook food for clients
const commandHandlerMiddleware = new CommandHandlerMiddleware(
  new ClassNameExtractor(),
  new InMemoryLocator({
    CreateToDoHandler: new CreateToDoHandler(),
    AllToDoHandler: new AllToDoHandler(),
    FindToDoHandler: new FindToDoHandler()
  }),
  new HandleInflector()
);

module.exports = commandHandlerMiddleware;
