const faker = require("faker");
const sinon = require("sinon");

const GoogleAuthService = require("../../App/Domain/services/googleAuthService");
const userEventsListner = require("../../App/Application/events/userEventsListner");
const mailerStub = sinon.stub(userEventsListner._events, "userIsRegistered").returns("Email Sent Successfully.");
const getGoogleAccountFromCodeStub = sinon.stub(GoogleAuthService.prototype, "getGoogleAccountFromCode")
    .returns({ name: faker.name.findName(), email: faker.internet.email(), password: faker.internet.password() });

module.exports = { mailerStub, getGoogleAccountFromCodeStub };