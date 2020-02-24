const uuidv1 = require("uuid/v1");
const bcrypt = require("bcrypt");
const User = require("../models/user");

class UserStore {
  static async create(params) {
    const user = new User({
      userID: uuidv1(),
      name: params.name,
      password: params.password,
      email: params.email
    });
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    return user;
  }

  static async findAll() {
    const users = await User.find({});
    return users;
  }

  static async findByUserID(userID) {
    let user = await User.findOne({ userID: userID });
    return user;
  }

  static async findByEmail(email) {
    let user = await User.findOne({ email: email });
    return user;
  }

  static async update(params) {
    let user = await User.findOneAndUpdate(
      { userID: params.userID },
      { email: params.email, name: params.name },
      function(err, u) {
        console.log("@@@@@@@@@@@@@@@", u);
      }
    );
    return user;
  }
  static async remove(userID) {
    await User.findOneAndDelete({ userID: userID }, function(err, u) {
      console.log("@@@@@@@@@@@@@@@", u);
    });
  }
}
module.exports = UserStore;
