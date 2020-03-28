const expect = require("chai").expect;
const ValidationError = require('mongoose').Error.ValidationError;
const ToDoService = require("../../App/Domain/services/todo");
const ToDoStore = require("../../App/Infrastructure/stores/todoStore");
const ToDoEntity = require("../../App/Domain/entities/todo");
const toDoDetails = require("../helper/todo");

describe("ToDo Service methods", async () => {
  beforeEach(async () => {
    const toDo = ToDoEntity.createFromDetails(toDoDetails);
    await ToDoStore.add(toDo);
  });

  it("expects todo must not be created due to validation.", async () => {
    try {
      await ToDoService.create({});
    } catch(e) {
      expect(e).to.be.an.instanceOf(ValidationError)
    }
  });

  it("toDo should be created.", async () => {
    const createdToDo = await ToDoService.create({
      description: "I am testing",
      completed: true
    });
    expect(createdToDo).to.be.an.instanceOf(ToDoEntity);
  });

  it("toDo should be updated.", async () => {
    const latestToDos = await ToDoStore.first();
    const toDo = latestToDos[0];
    const updatedToDo = await ToDoService.update({
      toDoID: toDo.toDoID,
      description: "Testing"
    });
    expect(updatedToDo).to.be.an.instanceOf(ToDoEntity);
  });

  it("toDo should be removed.", async () => {
    const latestToDos = await ToDoStore.first();
    const toDo = latestToDos[0];
    const deletedToDo = await ToDoService.remove(toDo);
    expect(deletedToDo).to.be.an.instanceOf(Object);
  });
});
