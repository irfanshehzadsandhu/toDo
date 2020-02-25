const faker = require("faker");
user = {
  description: faker.lorem.paragraph(),
  completed: faker.random.boolean()
};
module.exports = user;
