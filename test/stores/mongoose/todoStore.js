const expect = require("chai").expect;
const ToDoStore = require("../../../App/Infrastructure/stores/mongoose/todoStore");
const ToDoEntity = require("../../../App/Domain/entities/todo");
const toDoDetails = require("../../factories/todo");
const store = new ToDoStore();

describe("ToDo Store methods", async () => {
  beforeEach(async () => {
    const toDo = ToDoEntity.createFromDetails(toDoDetails);
    await store.add(toDo);
  });

  it("should find all toDos from store", async () => {
    const toDos = await store.findAll({ page: 1, limit: 10 });
    expect(toDos.paginationInfo.totalItems).eq(1);
  });


  it("should count the ToDos.", async () => {
    const count = await store.count();
    expect(count).eq(1);
  });


  it("should update ToDo with given details.", async () => {
    const toDoList = await store.first();
    const toDo = toDoList[0];
    const updatedToDoInfo = await store.update({
      toDoID: toDo.toDoID,
      description: "Testing"
    });
    expect(updatedToDoInfo).to.be.an.instanceOf(ToDoEntity);
  });

  it("should delete ToDo with given ToDoID.", async () => {
    const toDoList = await store.first();
    const toDo = toDoList[0];
    await store.remove(toDo);
    const toDos = await store.findAll({ page: 1, limit: 10 });
    expect(toDos.paginationInfo.totalItems).eq(0);
  });
});
