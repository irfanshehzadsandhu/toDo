const ToDo = require("../../models/mongoose/todo");
const ToDoEntity = require("../../../Domain/entities/todo");
const PaginationConfig = require("../../utils/paginationConfig");
const PaginatedData = require("../../utils/paginatedData");

class MongooseToDoStore {
  async add(toDo) {
    //create() for saving many documents at a time. Create is basically using save() for each document
    const newToDo = await ToDo.create(toDo);
    return ToDoEntity.createFromObject(newToDo);
  }

  async findAll(params) {
    const query = params.completed ? { completed: params.completed } : {};
    const totalToDos = await ToDo.count(query);
    const paginatedData = new PaginatedData(new PaginationConfig(params.page, params.limit), totalToDos);
    const paginatedToDos = await ToDo.find(query)
      .limit(paginatedData.paginationConfig.limit())
      .skip(paginatedData.paginationConfig.offset());
    paginatedToDos.forEach(function (toDo) {
      paginatedData.addItem(ToDoEntity.createFromObject(toDo))
    });
    return paginatedData.paginatedItems();
  }


  async update(toDo) {
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

  async remove(toDo) {
    //deleteOne will delete at most document matching the query.
    const result = await ToDo.findOneAndRemove(toDo);
    return result;
  }

}
module.exports = MongooseToDoStore;
