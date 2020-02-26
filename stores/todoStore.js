const uuidv1 = require("uuid/v1");
const ToDo = require("../models/todo");
class ToDoStore {
  constructor(params) {
    this.description = params.description;
    this.completed = params.completed;
  }
  //for tests
  createFromObject(obj) {
    this.description = obj.description;
    this.completed = obj.completed;
  }

  setToDoID() {
    this.toDoID = uuidv1();
  }
  static async add(toDo) {
    //create() for saving many documents at a time. Create is basically using save() for each document
    return await ToDo.create(toDo);
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
    const updatedToDo = await ToDo.findOneAndUpdate(
      { toDoID: toDo.toDoID },
      user,
      function() {}
    );
    return updatedToDo;
  }
  static async remove(toDo) {
    //deleteOne will delete at most document matching the query.
    await ToDo.deleteOne(toDo);
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
