const toDoService = require("../../../../services/todo");
exports.find = async (req, res) => {
  try {
    res.send(await toDoService.find(req.toDoID));
  } catch (e) {
    res.send("Something went wrong.");
  }
};

exports.all = async (req, res) => {
  try {
    res.send(await toDoService.all());
  } catch (e) {
    res.send("Something went wrong.");
  }
};

exports.create = async (req, res) => {
  try {
    res.send(await toDoService.create(req.body));
  } catch (e) {
    res.send("Something went wrong.");
  }
};

exports.update = async (req, res) => {
  try {
    res.send(await toDoService.update(req.body));
  } catch (e) {
    res.send("Something went wrong.");
  }
};

exports.destroy = async (req, res) => {
  try {
    res.send(await toDoService.remove(req.body));
  } catch (e) {
    res.send("Something went wrong.");
  }
};
