const uuidv1 = require("uuid/v1");
class ToDoEntity {
  constructor(toDoID, description, completed) {
    this.toDoID = toDoID;
    this.description = description;
    this.completed = completed;
  }

  static createFromDetails(params) {
    const toDo = new ToDoEntity(uuidv1(), params.description, params.completed);
    return toDo;
  }
  static createFromObject(obj) {
    const toDo = new ToDoEntity(obj.toDoID, obj.description, obj.completed);
    return toDo;
  }
}
module.exports = ToDoEntity;
