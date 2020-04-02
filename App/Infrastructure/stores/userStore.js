const UserEntity = require("../../Domain/entities/user");
const UserFactory = require("../factories/userFactory");

class UserStore {
  static async add(user) {
    //create() for saving many documents at a time. Create is basically using save() for each document
    const newUser = await UserFactory.add(user)
    return UserEntity.createFromObject(newUser);
  }

  static async findByUserID(userID) {
    //findOne() returns at most one document and findMany will return all documents matching the query.
    const user = await UserFactory.findByUserID(userID);
    if (user) {
      return UserEntity.createFromObject(user);
    }
  }

  static async findByEmail(email) {
    const user = await UserFactory.findByEmail(email);
    if (user) {
      return UserEntity.createFromObject(user);
    }
  }

  static async update(user) {
    return await UserFactory.update(user);
  }

  static async isPresent(user) {
    return await UserFactory.isPresent(user);
  }

  static async first(limit = 1) {
    return await UserFactory.first(limit);
  }

  static async last(limit = 1) {
    return await UserFactory.last(limit);
  }

}
module.exports = UserStore;
