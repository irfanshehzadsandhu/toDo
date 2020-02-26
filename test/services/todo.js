const expect = require("chai").expect;
const ToDoService = require("../../services/todo");
const ToDoStore = require("../../stores/todoStore");
const TodoEntity = require("../../entities/todo");
const toDoDetails = require("../helper/todo");

describe("ToDo Service methods", async () => {
  const toDo = TodoEntity.createFromObject(toDoDetails);
  beforeEach(async () => {
    await ToDoStore.add(toDo);
  });

  it("expects todo must not be created due to validation.", async () => {
    const error = await ToDoService.create({});
    expect(error.status).eq(400);
  });

  it("toDo should be created.", async () => {
    const toDo = await ToDoService.create({
      description: "I am testing",
      completed: true
    });
    expect(toDo.status).eq(200);
  });
});
