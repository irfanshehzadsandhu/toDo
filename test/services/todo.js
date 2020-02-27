const expect = require("chai").expect;
const ToDoService = require("../../services/todo");
const ToDoStore = require("../../stores/todoStore");
const TodoEntity = require("../../entities/todo");
const toDoDetails = require("../helper/todo");

describe("ToDo Service methods", async () => {
  beforeEach(async () => {
    const toDo = TodoEntity.createFromDetails(toDoDetails);
    await ToDoStore.add(toDo);
  });

  it("expects todo must not be created due to validation.", async () => {
    const error = await ToDoService.create({});
    expect(error.status).eq(403);
  });

  it("toDo should be created.", async () => {
    const toDo = await ToDoService.create({
      description: "I am testing",
      completed: true
    });
    expect(toDo.isCreated).eq(true);
  });

  it("toDo should be updated.", async () => {
    const latestToDos = await ToDoStore.first();
    const toDo = latestToDos[0];
    const updatedToDo = await ToDoService.update({
      toDoID: toDo.toDoID,
      description: "Testing"
    });
    expect(updatedToDo.isUpdated).eq(true);
  });

  it("toDo should be removed.", async () => {
    const latestToDos = await ToDoStore.first();
    const toDo = latestToDos[0];
    const deletedToDo = await ToDoService.remove(toDo);
    expect(deletedToDo.isDeleted).eq(true);
  });
});
