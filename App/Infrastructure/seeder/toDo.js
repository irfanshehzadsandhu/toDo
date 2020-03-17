const faker = require("faker");
const db = require("./models/mongoose");
const ToDoStore = require("./stores/todoStore");
const ToDoEntity = require("./entities/todo");
db.connect();
for (var i = 0; i < 100; i++) {
  const toDoToAdd = ToDoEntity.createFromDetails({
    description: faker.lorem.paragraph(),
    completed: faker.random.boolean()
  });
  ToDoStore.add(toDoToAdd);
}
