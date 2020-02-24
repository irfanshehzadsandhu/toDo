const uuidv1 = require("uuid/v1");
const User = require("../models/user");

class UserStore {
  static async create(params) {
    const user = await User.create({
      userID: uuidv1(),
      name: params.name,
      email: params.email,
      password: params.password
    });
    return user;
  }

  static async findAll() {
    const users = await User.find({});
    return users;
  }

  static async findByUserID(userID) {
    let user = await User.find({ userID: userID });
    return user;
  }

  static async findByUserEmail(email) {
    let user = await User.find({ email: email });
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
