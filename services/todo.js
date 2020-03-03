const validate = require("../validators/todoValidator");
const ToDoStore = require("../stores/todoStore");
const ToDoEntity = require("../entities/todo");

exports.find = async toDoID => {
  const toDo = await ToDoStore.findByToDoID(toDoID);
  if (toDo) {
    return { toDo: toDo };
  } else {
    return { code: 403, message: "ToDo not found." };
  }
};

exports.all = async (search, page) => {
  return await ToDoStore.findAll(search, page);
};

exports.create = async params => {
  // validate the request body first
  const { error } = validate(params);
  if (error) {
    return { status: 403, message: error.details[0].message };
  }

  //Create a toDo from entity first
  const toDoToAdd = ToDoEntity.createFromDetails(params);
  const toDo = await ToDoStore.add(toDoToAdd);
  if (toDo) {
    return { toDo: toDo };
  } else {
    return { code: 403, message: "ToDo not created." };
  }
};

exports.update = async params => {
  const toDoToUpdate = ToDoEntity.createFromObject(params);
  const toDo = await ToDoStore.update(toDoToUpdate);
  if (toDo) {
    return { toDo: toDo };
  } else {
    return { code: 403, message: "ToDo not created." };
  }
};

exports.remove = async params => {
  const toDo = await ToDoStore.findByToDoID(params.toDoID);
  const toDoForDeletion = ToDoEntity.createFromObject(toDo); //Without using createFromObject it store remove next object even object is already deleted.
  return await ToDoStore.remove(toDoForDeletion);
};
