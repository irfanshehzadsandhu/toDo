const { db } = require("../config");
const AbstractFactory = require("./abstractFactory");
class UserFactory extends AbstractFactory {
  constructor() {
    super();
  }
  static getUserStore() {
    if (db.driver == "mongoose") {
      const MongooseUserStore = require("../stores/mongoose/userStore");
      return new MongooseUserStore();
    }
    if (db.driver == "sequelize") {
      const SequelizeUserStore = require("../stores/sequelize/userStore");
      return new SequelizeUserStore();
    }
  }
};
module.exports = UserFactory;