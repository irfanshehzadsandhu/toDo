const mongoose = require("mongoose");

let UserSchema = require("../schemas/user.schema");
const User = mongoose.model("User", UserSchema);

module.exports = User;
