const User = require("../../models/mongoose/user");
const UserEntity = require("../../../Domain/entities/user");

class MongooseUserStore {
  async add(user) {
    const newUser = await User.create(user)
    return UserEntity.createFromObject(newUser);
  }

  async findByUserID(userID) {
    const user = await User.findOne({ userID: userID });
    if (user) {
      return UserEntity.createFromObject(user);
    }
  }

  async findByEmail(email) {
    return await User.findOne({ email: email });
  }

  async update(user) {
    return await User.findOneAndUpdate({ userID: user.userID }, user, {
      new: true // this will return the updated document
    });
  }

  async userIsPresent(userID) {
    return await User.exists({ userID: userID });
  }


}
module.exports = MongooseUserStore;
