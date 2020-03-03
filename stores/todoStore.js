const ToDo = require("../models/todo");
const ToDoEntity = require("../entities/todo");
const Pagination = require("../http/utils/pagination");
class ToDoStore {
  static async add(toDo) {
    //create() for saving many documents at a time. Create is basically using save() for each document
    const newToDo = await ToDo.create(toDo);
    return ToDoEntity.createFromObject(newToDo);
  }

  static async findAll(params) {
    const paginationInfo = new Pagination(
      parseInt(params.page) || 1,
      await ToDo.count({})
    ).paginationInfo();
    const toDos = await ToDo.find({})
      .sort({ createdAt: 1 })
      .skip(paginationInfo.offset)
      .limit(paginationInfo.limit);
    return {
      data: toDos.map(toDo => ToDoEntity.createFromObject(toDo)),
      paginationInfo: paginationInfo
    };
  }

  static async findByToDoID(toDoID) {
    //findOne() returns at most one document and findMany will return all documents matching the query.
    const toDo = await ToDo.findOne({ toDoID: toDoID });
    if (toDo) {
      return ToDoEntity.createFromObject(toDo);
    }
  }

  static async update(toDo) {
    //updateOne() returns information of updated document e.g { n: 1, nModified: 0, ok: 1 }
    // findOneAndUpdate() returns updated document.
    //By default, findOneAndUpdate() returns the document as it was before update was applied.
    const updatedToDo = await ToDo.findOneAndUpdate(
      { toDoID: toDo.toDoID },
      toDo,
      {
        new: true // this will return the updated document
      }
    );
    if (updatedToDo) {
      return ToDoEntity.createFromObject(updatedToDo);
    }
  }

  static async remove(toDo) {
    //deleteOne will delete at most document matching the query.
    const result = await ToDo.findOneAndRemove(toDo);
    console.log(result);
    return result;
  }

  static async isPresent(toDo) {
    return await ToDo.exists(toDo);
  }
  static async first(limit = 1) {
    const toDos = await ToDo.find()
      .sort({ createdAt: -1 })
      .limit(limit);
    return toDos.map(toDo => ToDoEntity.createFromObject(toDo));
  }
  static async last(limit = 1) {
    const toDos = await ToDo.find()
      .sort({ createdAt: 1 })
      .limit(limit);
    return toDos.map(toDo => ToDoEntity.createFromObject(toDo));
  }

  static async count() {
    return ToDo.count({});
  }
}
module.exports = ToDoStore;
