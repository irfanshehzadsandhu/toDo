const validate = require("../validators/todoValidator");
const ToDoStore = require("../stores/todoStore");
const ToDoEntity = require("../entities/todo");
const appError = require("../http/errors/appError");
exports.find = async toDoID => {
  const toDo = await ToDoStore.findByToDoID(toDoID);
  if (toDo) {
    return { toDo: toDo };
  } else {
    return { code: 403, message: "ToDo not found." };
  }
};

exports.all = async search => {
  return await ToDoStore.findAll(search);
};

exports.create = async params => {
  // validate the request body first
  const { error } = validate(params);
  if (error) {
    throw new appError(error.details[0].message, 400);
  }

  //Create a toDo from entity first
  const toDoToAdd = ToDoEntity.createFromDetails(params);
  return await ToDoStore.add(toDoToAdd);
};

exports.update = async params => {
  const toDoToUpdate = ToDoEntity.createFromObject(params);
  return await ToDoStore.update(toDoToUpdate);
};

exports.remove = async params => {
  const toDo = await ToDoStore.findByToDoID(params.toDoID);
  const toDoForDeletion = ToDoEntity.createFromObject(toDo); //Without using createFromObject it store remove next object even object is already deleted.
  return await ToDoStore.remove(toDoForDeletion);
};
