const { Seeder } = require("mongoose-data-seed");
const faker = require("faker");
const uuidv1 = require("uuid/v1");
const ToDo = require("../../Infrastructure/models/mongoose/todo");

const data = [];

for (var i = 0; i < 500; i++) {
  data.push({
    toDoID: uuidv1(),
    name: faker.name.findName(),
    description: faker.lorem.paragraph(),
    completed: faker.random.boolean()
  });
}

class ToDoSeeder extends Seeder {
  async run() {
    return ToDo.create(data);
  }
}

module.exports = ToDoSeeder;
