const User = require("../models/user");
const UserEntity = require("../../Domain/entities/user");
class UserStore {
  static async add(user) {
    //create() for saving many documents at a time. Create is basically using save() for each document
    const newUser = await User.create(user);
    return UserEntity.createFromObject(newUser);
  }

  static async findAll() {
    //find() returns an array of documents
    const users = await User.find({});
    return users.map(user => UserEntity.createFromObject(user));
  }

  static async findByUserID(userID) {
    //findOne() returns at most one document and findMany will return all documents matching the query.
    const user = await User.findOne({ userID: userID });
    if (user) {
      return UserEntity.createFromObject(user);
    }
  }

  static async findByEmail(email) {
    const user = await User.findOne({ email: email });
    if (user) {
      return UserEntity.createFromObject(user);
    }
  }

  static async update(user) {
    //updateOne() returns information of updated document e.g { n: 1, nModified: 0, ok: 1 }
    // findOneAndUpdate() returns updated document.
    //By default, findOneAndUpdate() returns the document as it was before update was applied.
    return await User.findOneAndUpdate({ userID: user.userID }, user, {
      new: true // this will return the updated document
    });
  }

  static async isPresent(user) {
    return await User.exists(user);
  }
  static async first(limit = 1) {
    const users = await User.find()
      .sort({ createdAt: -1 })
      .limit(limit);
    return users.map(user => UserEntity.createFromObject(user));
  }
  static async last(limit = 1) {
    const users = await User.find()
      .sort({ createdAt: 1 })
      .limit(limit);
    return users.map(user => UserEntity.createFromObject(user));
  }

  static async count() {
    return User.count({});
  }
}
module.exports = UserStore;
