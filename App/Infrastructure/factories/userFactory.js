const { db } = require("../config");
const MongooseModel = require("../models/mongoose/user");
const SequelizeModel = require("../models/sequelize/user");
class UserFactory {
  constructor() {
    this.dataBaseDriver = db.driver;
  }

  isUsingMongooseDriver() {
    return this.dataBaseDriver == "mongoose";
  }

  isUsingSequelizeDriver() {
    return this.dataBaseDriver == "sequelize";
  }

  static async add(userObj) {
    const factory = new UserFactory();
    if (factory.isUsingMongooseDriver()) {
      return await MongooseModel.create(userObj);
    }
    if (factory.isUsingSequelizeDriver) {
      return await SequelizeModel.create(userObj);
    }
  }

  static async findByUserID(userID) {
    const factory = new UserFactory();
    if (factory.isUsingMongooseDriver()) {
      return await MongooseModel.findOne({ userID: userID });
    }
    if (factory.isUsingSequelizeDriver) {
      return await SequelizeModel.findOne({ where: { userID: userID } });
    }
  }

  static async findByEmail(email) {
    const factory = new UserFactory();
    if (factory.isUsingMongooseDriver()) {
      return await MongooseModel.findOne({ email: email });
    }
    if (factory.isUsingSequelizeDriver) {
      return await SequelizeModel.findOne({ where: { email: email } });
    }
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