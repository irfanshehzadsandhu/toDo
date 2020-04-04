const { db } = require("../config");
class AbstractFactory {
  constructor() {
    if (this == AbstractFactory) {
      throw new Error("You can not instantiate an abstract factory.");
    }
  }

  static getUserFactory() {
    if (db.driver == "mongoose") {
      const MongooseUserStore = require("../stores/mongoose/userStore");
      return new MongooseUserStore();
    }
    if (db.driver == "sequelize") {
      const SequelizeUserStore = require("../stores/sequelize/userStore");
      return new SequelizeUserStore();
    }
  }

  static getToDoFactory() {
    if (db.driver == "mongoose") {
      const MongooseToDoStore = require("../stores/mongoose/todoStore");
      return new MongooseToDoStore();
    }
    if (db.driver == "sequelize") {
      const SequelizeToDoStore = require("../stores/sequelize/todoStore");
      return new SequelizeToDoStore();
    }
  }
}
module.exports = AbstractFactory;