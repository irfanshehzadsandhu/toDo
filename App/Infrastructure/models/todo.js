const mongoose = require("mongoose");

const ToDoSchema = new mongoose.Schema({
  toDoID: {
    type: String,
    required: true,
    unique: true
  },
  description: { type: String,required: [true, "can't be blank"] },
  completed: { type: Boolean,required: [true, "can't be blank"], default: false },
  createdAt: { type: Date,required: [true, "can't be blank"], default: Date.now }
});

const ToDo = mongoose.model("ToDo", ToDoSchema);
module.exports = ToDo;
