const expect = require("chai").expect;
const ToDoStore = require("../../App/Infrastructure/stores/todoStore");
const ToDoEntity = require("../../App/Domain/entities/todo");
const toDoDetails = require("../factories/todo");
describe("ToDo Store methods", async () => {
  beforeEach(async () => {
    const toDo = ToDoEntity.createFromDetails(toDoDetails);
    await ToDoStore.add(toDo);
  });

  it("should find all toDos from store", async () => {
    const toDos = await ToDoStore.findAll({ page: 1, limit: 10 });
    expect(toDos.paginationInfo.totalItems).eq(1);
  });

  it("should find user with given userID.", async () => {
    const toDoList = await ToDoStore.first(); //In first we can pass integer e.g 2 or 10 for fetching latest documents
    const toDo = toDoList[0];
    const toDoFromDb = await ToDoStore.findByToDoID(toDo.toDoID);
    expect(toDoFromDb.toDoID).eq(toDo.toDoID);
  });

  it("should return oldest ToDos.", async () => {
    const oldestToDos = await ToDoStore.last(); //In last we can pass integer e.g 2 or 10 for fetching oldest documents
    expect(oldestToDos[0].completed).eq(toDo.completed);
  });

  it("should count the ToDos.", async () => {
    const count = await ToDoStore.count();
    expect(count).eq(1);
  });

  it("should check ToDo is present in Database.", async () => {
    const toDoList = await ToDoStore.first();
    const toDo = toDoList[0];
    const result = await ToDoStore.isPresent(toDo);
    expect(result).eq(true);
  });

  it("should update ToDo with given details.", async () => {
    const toDoList = await ToDoStore.first();
    const toDo = toDoList[0];
    const updatedToDoInfo = await ToDoStore.update({
      toDoID: toDo.toDoID,
      description: "Testing"
    });
    expect(updatedToDoInfo).to.be.an.instanceOf(ToDoEntity);
  });

  it("should delete ToDo with given ToDoID.", async () => {
    const toDoList = await ToDoStore.first();
    const toDo = toDoList[0];
    const toDoToDelete = await ToDoStore.findByToDoID(toDo.toDoID);
    await ToDoStore.remove(toDoToDelete);
    const toDos = await ToDoStore.findAll({ page: 1, limit: 10 });
    expect(toDos.paginationInfo.totalItems).eq(0);
  });
});
