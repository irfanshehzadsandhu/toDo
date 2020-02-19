const mongoose = require("mongoose");
let ToDoSchema = require("../schemas/todo.schema");
module.exports = mongoose.model("ToDo", ToDoSchema);
