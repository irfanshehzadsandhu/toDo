const toDoService = require("../../../../services/todo");
const handleError = require("../../../utils/handleError");
exports.find = async (req, res) => {
  try {
    res.send(await toDoService.find(req.toDoID));
  } catch (e) {
    handleError(e, res);
  }
};

exports.all = async (req, res) => {
  try {
    res.send(await toDoService.all());
  } catch (e) {
    handleError(e, res);
  }
};

exports.create = async (req, res) => {
  try {
    res.send(await toDoService.create(req.body));
  } catch (e) {
    handleError(e, res);
  }
};

exports.update = async (req, res) => {
  try {
    res.send(await toDoService.update(req.body));
  } catch (e) {
    handleError(e, res);
  }
};

exports.destroy = async (req, res) => {
  try {
    res.send(await toDoService.remove(req.body));
  } catch (e) {
    handleError(e, res);
  }
};
