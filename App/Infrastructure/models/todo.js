const mongoose = require("mongoose");
const paginate = require("../utils/paginate");
const ToDoSchema = new mongoose.Schema({
  toDoID: {
    type: String,
    required: true,
    unique: true
  },
  description: { type: String },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
ToDoSchema.plugin(paginate);
const ToDo = mongoose.model("ToDo", ToDoSchema);
module.exports = ToDo;
