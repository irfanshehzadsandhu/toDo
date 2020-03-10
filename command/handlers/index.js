const {
  CommandHandlerMiddleware,
  ClassNameExtractor,
  InMemoryLocator,
  HandleInflector
} = require("simple-command-bus");
const CreateToDoHandler = require("./toDoHandler/createToDoHandler");
//Consider middlerware as a waiter , accepting orders from different clients and pass these orders to chef to cook food for clients
const commandHandlerMiddleware = new CommandHandlerMiddleware(
  new ClassNameExtractor(),
  new InMemoryLocator({
    CreateToDoHandler: new CreateToDoHandler()
  }),
  new HandleInflector()
);

module.exports = commandHandlerMiddleware;
