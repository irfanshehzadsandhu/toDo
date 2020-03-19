const faker = require("faker");
const ToDoStore = require("../stores/todoStore");
const ToDoEntity = require("../../Domain/entities/todo");
for (var i = 0; i < 100; i++) {
  console.log("**************", i);
  const toDoToAdd = ToDoEntity.createFromDetails({
    description: faker.lorem.paragraph(),
    completed: faker.random.boolean()
  });
  ToDoStore.add(toDoToAdd);
}
