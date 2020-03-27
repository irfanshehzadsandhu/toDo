const Email = require("../mailer/email");
const { EventEmitter } = require("events");
const eventEmitter = new EventEmitter();

eventEmitter.on("userIsRegistered", (user) => {
  new Email(user.email,"Registration Successfull","You have registered successfully").userRegistrationEmail();
});

module.exports = eventEmitter;