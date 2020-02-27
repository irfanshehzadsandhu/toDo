const uuidv1 = require("uuid/v1");
const ToDo = require("../models/todo");
class ToDoStore {
  static async add(toDo) {
    //create() for saving many documents at a time. Create is basically using save() for each document
    try {
      const newToDo = await ToDo.create(toDo);
      return { isCreated: true, todo: newToDo };
    } catch (e) {
      return { isCreated: false };
    }
  }

  static async findAll() {
    //find() returns an array of documents
    return await ToDo.find({});
  }

  static async findByToDoID(toDoID) {
    //findOne() returns at most one document and findMany will return all documents matching the query.
    return await ToDo.findOne({ toDoID: toDoID });
  }

  static async update(toDo) {
    //updateOne() returns information of updated document e.g { n: 1, nModified: 0, ok: 1 }
    // findOneAndUpdate() returns updated document.
    const updated = await ToDo.updateOne({ toDoID: toDo.toDoID }, toDo);

    if (updated.nModified == 1) {
      return { isUpdated: true };
    } else {
      return { isUpdated: false };
    }
  }

  static async remove(toDo) {
    //deleteOne will delete at most document matching the query.
    const deleted = await ToDo.deleteOne(toDo);
    if (deleted.deletedCount == 1) {
      return { isDeleted: true };
    } else {
      return { isDeleted: false };
    }
  }

  static async isPresent(toDo) {
    return await ToDo.exists(toDo);
  }
  static async first(limit = 1) {
    return await ToDo.find()
      .sort({ createdAt: -1 })
      .limit(limit);
  }
  static async last(limit = 1) {
    return await ToDo.find()
      .sort({ createdAt: 1 })
      .limit(limit);
  }

  static async count() {
    return ToDo.count({});
  }
}
module.exports = ToDoStore;
