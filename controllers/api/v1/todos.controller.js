const ToDo = require("../../../models/todo.model");
const uuidv1 = require("uuid/v1");

exports.find = function(req, res) {
  ToDo.find({ _id: req.query.id }, function(err, todo) {
    if (err) {
      res.send({
        code: 403,
        err: err
      });
    }
    res.send({
      code: 200,
      todo: todo
    });
  });
};

exports.all = function(req, res) {
  ToDo.find({}, function(err, todos) {
    if (err) {
      res.send({
        code: 403,
        err: err
      });
    }
    res.send({
      code: 200,
      todos: todos
    });
  });
};

exports.create = function(req, res) {
  //console.log(req.params);
  let todo = new ToDo({
    id: uuidv1(),
    description: req.body.description,
    completed: req.body.completed
  });
  todo.save(function(err) {
    if (err) {
      res.send({
        code: 403,
        err: err
      });
    }
    res.send({
      code: 200,
      message: "ToDo created successfully."
    });
  });
};

exports.update = function(req, res) {
  todo_for_update = {
    description: req.body.description,
    completed: req.body.completed
  };
  ToDo.findOneAndUpdate({ _id: req.body.id }, todo_for_update, function(
    err,
    todo
  ) {
    if (err) {
      res.send({
        code: 403,
        err: err
      });
    }
    res.send({
      code: 200,
      message: "ToDo updated successfully."
    });
  });
};

exports.destroy = function(req, res) {
  ToDo.findOneAndDelete({ _id: req.body.id }, function(err, todo) {
    if (err) {
      res.send({
        code: 403,
        err: err
      });
    }
    res.send({
      code: 200,
      message: "ToDo deleted successfully."
    });
  });
};
