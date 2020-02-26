const faker = require("faker");
toDo = {
  description: faker.lorem.paragraph(),
  completed: faker.random.boolean()
};
module.exports = toDo;
