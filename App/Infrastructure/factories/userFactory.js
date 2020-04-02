const { db } = require("../config");
const MongooseUser = require("../models/mongoose/user");
class UserFactory {
  constructor() {
    this.dataBaseDriver = db.driver;
  }

  isUsingMongooseDriver() {
    return this.dataBaseDriver == "mongoose";
  }

  static async add(userObj) {
    const factory = new UserFactory();
    if (factory.isUsingMongooseDriver()) {
      return await MongooseUser.create(userObj);
    } else {
      //load sequelize user model and run query
    }
  }

  static async findByUserID(userID) {
    new UserFactory();
    return await MongooseUser.findOne({ userID: userID });
  }

  static async findByEmail(email) {
    new UserFactory();
    return await MongooseUser.findOne({ email: email });
  }

  static async update(user) {
    new UserFactory();
    //updateOne() returns information of updated document e.g { n: 1, nModified: 0, ok: 1 }
    // findOneAndUpdate() returns updated document.
    //By default, findOneAndUpdate() returns the document as it was before update was applied.
    return await MongooseUser.findOneAndUpdate({ userID: user.userID }, user, {
      new: true // this will return the updated document
    });
  }

  static async isPresent(user) {
    new UserFactory();
    return await MongooseUser.exists(user);
  }

  static async first(limit) {
    new UserFactory();
    const users = await MongooseUser.find()
      .sort({ createdAt: -1 })
      .limit(limit);
    return users.map(user => UserEntity.createFromObject(user));
  }

  static async last(limit) {
    new UserFactory();
    const users = await MongooseUser.find()
      .sort({ createdAt: 1 })
      .limit(limit);
    return users.map(user => UserEntity.createFromObject(user));
  }
}
module.exports = UserFactory;