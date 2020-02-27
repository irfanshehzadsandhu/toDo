const toDoService = require("../../../../services/todo");
// exports.find = async (req, res) => {
//   const toDoServiceResponse = await toDoService.find(req, res);
//   res.send(toDoServiceResponse);
// };

// exports.all = async (req, res) => {
//   const toDoServiceResponse = await toDoService.all(req, res);
//   res.send(toDoServiceResponse);
// };

exports.create = toDoService.create;

exports.update = toDoService.update;

exports.destroy = toDoService.remove;
