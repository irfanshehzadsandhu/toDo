const EmailUser = require("../mailer/userMailer");
const { EventEmitter } = require("events");
const eventEmitter = new EventEmitter();

eventEmitter.on("userIsRegistered", (user) => {
  new EmailUser(user.email, "Registration Successfull", "You have registered successfully").userRegistrationEmail();
});

eventEmitter.on("passwordUpdated", (user) => {
  new EmailUser(user.email, "Password Updated Successfull", "Password is updated successfully").userPasswordUpdated();
});

module.exports = eventEmitter;