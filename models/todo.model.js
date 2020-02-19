const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let ToDoSchema = new Schema({
  description: { type: String },
  completed: { type: Boolean, default: false }
});
module.exports = mongoose.model("ToDo", ToDoSchema);
