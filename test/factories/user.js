const faker = require("faker");
user = {
  name: faker.name.findName(),
  email: faker.internet.email()
};
module.exports = user;
