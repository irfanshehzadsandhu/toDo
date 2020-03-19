const { Seeder } = require("mongoose-data-seed");
const faker = require("faker");
const uuidv1 = require("uuid/v1");
const ToDo = require("../models/todo");

const data = [
  {
    toDoID: uuidv1(),
    description: faker.lorem.paragraph(),
    completed: faker.random.boolean()
  },
  {
    toDoID: uuidv1(),
    description: faker.lorem.paragraph(),
    completed: faker.random.boolean()
  }
];

class ToDoSeeder extends Seeder {
  async run() {
    return ToDo.create(data);
  }
}

module.exports = ToDoSeeder;
