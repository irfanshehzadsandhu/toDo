const validate = require("../validators/todoValidator");
const ToDoStore = require("../stores/todoStore");
const ToDoEntity = require("../entities/todo");

exports.find = async toDoID => {
  const toDo = await ToDoStore.findByToDoID(toDoID);
  return ToDoEntity.createFromObject(toDo);
};

exports.all = async () => {
  const toDos = await ToDoStore.findAll();
  return toDos.map(toDo => ToDoEntity.createFromObject(toDo));
};

exports.create = async params => {
  // validate the request body first
  const { error } = validate(params);
  if (error) {
    return { status: 403, message: error.details[0].message };
  }

  //Create a toDo from entity first
  const toDo = ToDoEntity.createFromDetails(params);
  return await ToDoStore.add(toDo);
};

exports.update = async params => {
  const response = ToDoStore.update(params);
  return await response;
};

exports.remove = async params => {
  const toDo = await ToDoStore.findByToDoID(params.toDoID);
  return await ToDoStore.remove(toDo);
};
