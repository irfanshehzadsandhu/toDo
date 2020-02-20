const toDoService = require("../../../../services/todo.service");
exports.find = async (req, res) => {
  let toDoServiceResponse = await toDoService.find(req, res);
  res.send(toDoServiceResponse);
};

exports.all = async (req, res) => {
  let toDoServiceResponse = await toDoService.all(req, res);
  res.send(toDoServiceResponse);
};

exports.create = toDoService.create;

exports.update = toDoService.update;

exports.destroy = toDoService.destroy;
