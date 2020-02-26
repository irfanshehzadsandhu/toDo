const User = require("../models/user");
class UserStore {
  static async add(user) {
    //create() for saving many documents at a time. Create is basically using save() for each document
    return await User.create(user);
  }

  static async findAll() {
    //find() returns an array of documents
    return await User.find({});
  }

  static async findByUserID(userID) {
    //findOne() returns at most one document and findMany will return all documents matching the query.
    return await User.findOne({ userID: userID });
  }

  static async findByEmail(email) {
    return await User.findOne({ email: email });
  }

  static async update(user) {
    //updateOne() returns information of updated document e.g { n: 1, nModified: 0, ok: 1 }
    // findOneAndUpdate() returns updated document.
    const updatedUser = await User.findOneAndUpdate(
      { userID: user.userID },
      user,
      function() {}
    );
    return updatedUser;
  }
  static async remove(user) {
    //deleteOne will delete at most document matching the query.
    await User.deleteOne(user);
  }
  static async isPresent(user) {
    return await User.exists(user);
  }
  static async first(limit = 1) {
    return await User.find()
      .sort({ createdAt: -1 })
      .limit(limit);
  }
  static async last(limit = 1) {
    return await User.find()
      .sort({ createdAt: 1 })
      .limit(limit);
  }
  //TODO
  // static async findOneOrCreate(user) {
  //   return await User.findOneOrCreate(user);
  // }
  static async count() {
    return User.count({});
  }
}
module.exports = UserStore;
