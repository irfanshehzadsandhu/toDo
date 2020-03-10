const { Command } = require("simple-command-bus");
module.exports = class UserCommand extends Command {
  constructor(firstName, lastName) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
  }
  create() {
    console.log("I am in create method.");
  }
  //Create User Using Entity
  //Retrive User from Entity
};
