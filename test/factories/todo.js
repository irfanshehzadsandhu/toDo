const faker = require("faker");
toDo = {
  name: faker.name.findName(),
  description: faker.lorem.paragraph(),
  completed: faker.random.boolean()
};
module.exports = toDo;
