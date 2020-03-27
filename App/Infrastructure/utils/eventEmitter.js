const EmailUser = require("../mailer/userMailer");
const { EventEmitter } = require("events");
const eventEmitter = new EventEmitter();

eventEmitter.on("userIsRegistered", (user) => {
  new EmailUser(user.email,"Registration Successfull","You have registered successfully").userRegistrationEmail();
});

module.exports = eventEmitter;