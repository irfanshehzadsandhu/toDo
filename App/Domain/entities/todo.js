const uuidv1 = require("uuid/v1");
class ToDoEntity {
  constructor(toDoID, name, description, completed) {
    this.toDoID = toDoID;
    this.name = name;
    this.description = description;
    this.completed = completed;
  }

  static createFromDetails(params) {
    const toDo = new ToDoEntity(uuidv1(), params.name, params.description, params.completed);
    return toDo;
  }
  static createFromObject(obj) {
    const toDo = new ToDoEntity(obj.toDoID, obj.name, obj.description, obj.completed);
    return toDo;
  }
}
module.exports = ToDoEntity;
