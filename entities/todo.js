const uuidv1 = require("uuid/v1");
class ToDoEntity {
  constructor(toDoID, description, completed) {
    this.toDoID = toDoID;
    this.description = description;
    this.completed = completed;
  }
  static create(params) {
    const toDoID = uuidv1();
    const description = params.description;
    const completed = params.completed;
    const toDo = new ToDoEntity(toDoID, description, completed);
    return toDo;
  }
  //for tests
  static createFromObject(obj) {
    const toDoID = uuidv1();
    const description = obj.description;
    const completed = obj.completed;
    const toDo = new ToDoEntity(toDoID, description, completed);
    return toDo;
  }
}
module.exports = ToDoEntity;
