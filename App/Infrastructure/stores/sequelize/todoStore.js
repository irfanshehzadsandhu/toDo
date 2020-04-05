const ToDo = require("../../models/sequelize/todo");
const ToDoEntity = require("../../../Domain/entities/todo");
const PaginationConfig = require("../../utils/paginationConfig");
const PaginatedData = require("../../utils/paginatedData");

class SequelizeToDoStore {
  async add(toDo) {
    const newToDo = await ToDo.create(toDo);
    return ToDoEntity.createFromObject(newToDo);
  }

  async findAll(params) {
    const query = params.completed ? { completed: params.completed } : {};
    const totalToDos = await ToDo.count(query);
    const paginatedData = new PaginatedData(new PaginationConfig(params.page, params.limit), totalToDos);
    const paginatedToDos = await ToDo.findAll({ where: query, limit: paginatedData.paginationConfig.limit(), offset: paginatedData.paginationConfig.offset() });
    paginatedToDos.forEach(function (toDo) {
      paginatedData.addItem(ToDoEntity.createFromObject(toDo))
    });
    return paginatedData.paginatedItems();
  }

}
module.exports = SequelizeToDoStore;
