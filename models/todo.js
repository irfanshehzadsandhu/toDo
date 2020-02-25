const mongoose = require("mongoose");
module.exports = new mongoose.Schema({
  toDoID: {
    type: String,
    required: true,
    unique: true
  },
  description: { type: String },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
