const toDoService = require("../../../../services/todo");
const logger = require("../../../logs");
exports.find = async (req, res) => {
  try {
    res.send(await toDoService.find(req.toDoID));
  } catch (e) {
    logger.debug(e);
  }
};

exports.all = async (req, res) => {
  try {
    res.send(await toDoService.all());
  } catch (e) {
    logger.debug(e);
  }
};

exports.create = async (req, res) => {
  try {
    res.send(await toDoService.create(req.body));
  } catch (e) {
    logger.debug(e);
  }
};

exports.update = async (req, res) => {
  try {
    res.send(await toDoService.update(req.body));
  } catch (e) {
    logger.debug(e);
  }
};

exports.destroy = async (req, res) => {
  try {
    res.send(await toDoService.remove(req.body));
  } catch (e) {
    logger.debug(e);
  }
};
