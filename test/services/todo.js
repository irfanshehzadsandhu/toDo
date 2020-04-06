const expect = require("chai").expect;
const ValidationError = require('mongoose').Error.ValidationError;
const ToDoService = require("../../App/Domain/services/todo");
const ToDoEntity = require("../../App/Domain/entities/todo");
const toDoDetails = require("../factories/todo");
const ToDoFactory = require("../../App/Infrastructure/factories/todoFactory");
const store = ToDoFactory.getToDoStore();

describe("ToDo Service methods", async () => {
  beforeEach(async () => {
    const toDo = ToDoEntity.createFromDetails(toDoDetails);
    await store.add(toDo);
  });

  it("expects todo must not be created due to validation.", async () => {
    try {
      await ToDoService.create({});
    } catch (e) {
      expect(e).to.be.an.instanceOf(ValidationError)
    }
  });

  it("toDo should be created.", async () => {
    const createdToDo = await ToDoService.create({
      name: "Dummy Name",
      description: "I am testing",
      completed: true
    });
    expect(createdToDo).to.be.an.instanceOf(ToDoEntity);
  });

  it("toDo should be updated.", async () => {
    const latestToDos = await store.first();
    const toDo = latestToDos[0];
    const updatedToDo = await ToDoService.update({
      toDoID: toDo.toDoID,
      description: "Testing"
    });
    expect(updatedToDo).to.be.an.instanceOf(ToDoEntity);
  });

  it("toDo should be removed.", async () => {
    const latestToDos = await store.first();
    const toDo = latestToDos[0];
    const deletedToDo = await ToDoService.remove(toDo);
    expect(deletedToDo).to.be.an.instanceOf(Object);
  });
});
