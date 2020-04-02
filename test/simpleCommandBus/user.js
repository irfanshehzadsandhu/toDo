const expect = require("chai").expect;
const { CommandBus, LoggerMiddleware } = require("simple-command-bus");
const applicationBinding = require("../../App/Application/utils/applicationBinding");
const CreateUserCommand = require("../../App/Application/user/createUserCommand");
const userDetails = require("../factories/user");

const commandBus = new CommandBus([
    new LoggerMiddleware(console),
    applicationBinding
]);

describe("Simple Command bus", () => {
    it("must through an error with an invalid command.", async () => {
        class InvalidCommand { }
        expect(commandBus.handle.bind(null, new InvalidCommand())).to.throw();
    });

    it("must ensure user is created through proper handler method.", async () => {
        const result = await commandBus.handle(new CreateUserCommand(userDetails.name, userDetails.email, userDetails.password));
        expect(result.user.email).to.eq(userDetails.email);
    });
});