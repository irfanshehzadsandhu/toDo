const faker = require("faker");
const sinon = require("sinon");

const GoogleAuthentication = require("../../HTTP/utils/googleAuthentication");
const eventEmitter = require("../../App/Infrastructure/utils/eventEmitter");
const mailerStub = sinon.stub(eventEmitter._events, "userIsRegistered").returns("Email Sent Successfully.");
const getGoogleAccountFromCodeStub = sinon.stub(GoogleAuthentication.prototype, "getGoogleAccountFromCode")
    .returns({ name: faker.name.findName(), email: faker.internet.email(), password: faker.internet.password() });

module.exports = { mailerStub, getGoogleAccountFromCodeStub };