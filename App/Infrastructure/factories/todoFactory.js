const { db } = require("../config");
const AbstractFactory = require("./abstractFactory");
class ToDoFactory extends AbstractFactory {
  constructor() {
    super();
  }
  static getToDoStore() {
    if (db.driver == "mongoose") {
      const MongooseToDoStore = require("../stores/mongoose/todoStore");
      return new MongooseToDoStore();
    }
    if (db.driver == "sequelize") {
      const SequelizeToDoStore = require("../stores/sequelize/todoStore");
      return new SequelizeToDoStore();
    }
  }
};
module.exports = ToDoFactory;