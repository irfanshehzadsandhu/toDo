const toDoService = require("../../../../services/todo");
exports.find = async (req, res) => {
  const toDoServiceResponse = await toDoService.find(req.toDoID);
  res.send(toDoServiceResponse);
};

exports.all = async (req, res) => {
  const toDoServiceResponse = await toDoService.all();
  res.send(toDoServiceResponse);
};

exports.create = async (req, res) => {
  const response = await toDoService.create(req.body);
  if (response.isCreated) {
    res.send({ isCreated: true, code: 200, todo: response.todo });
  } else {
    res.send({ isCreated: false, code: 403 });
  }
};

exports.update = async (req, res) => {
  const response = await toDoService.update(req.body);
  if (response.isUpdated) {
    res.send({ isUpdated: true, code: 200 });
  } else {
    res.send({ isUpdated: false, code: 403 });
  }
};

exports.destroy = async (req, res) => {
  const response = await toDoService.remove(req.body);
  if (response.isDeleted) {
    res.send({ isDeleted: true, code: 200 });
  } else {
    res.send({ isDeleted: false, code: 403 });
  }
};
