const sinon = require("sinon");
const eventEmitter = require("../../App/Infrastructure/utils/eventEmitter");
const mailerStub = sinon.stub(eventEmitter._events, "userIsRegistered").returns("Email Sent Successfully.");
module.exports = mailerStub;
