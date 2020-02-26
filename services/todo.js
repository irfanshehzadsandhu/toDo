const validate = require("../validators/todoValidator");
const ToDoStore = require("../stores/todoStore");
const ToDoEntity = require("../entities/todo");

exports.create = async params => {
  // validate the request body first
  const { error } = validate(params);
  if (error) {
    return { status: 400, message: error.details[0].message };
  }

  //Create a toDo from entity first
  const toDo = ToDoEntity.create(params);
  const newToDo = await ToDoStore.add(toDo);
  return { status: 200, message: "ToDo created successfully.", toDo: newToDo };
};
