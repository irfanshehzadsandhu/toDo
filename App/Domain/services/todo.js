const ToDoFactory = require("../../Infrastructure/factories/todoFactory");
const ToDoEntity = require("../../Domain/entities/todo");
const store = ToDoFactory.loadStore();
exports.find = async toDoID => {
  return await store.findByToDoID(toDoID);
};

exports.all = async search => {
  return await store.findAll(search);
};

exports.create = async params => {
  //Create a toDo from entity first
  const toDoToAdd = ToDoEntity.createFromDetails(params);
  return await store.add(toDoToAdd);
};

exports.update = async params => {
  const toDoToUpdate = ToDoEntity.createFromObject(params);
  return await store.update(toDoToUpdate);
};

exports.remove = async params => {
  const toDo = await store.findByToDoID(params.toDoID);
  const toDoForDeletion = ToDoEntity.createFromObject(toDo); //Without using createFromObject it store remove next object even object is already deleted.
  return await store.remove(toDoForDeletion);
};
