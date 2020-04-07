class ToDoStore {
  static buildMongooseToDoStore() {
    const MongooseToDoStore = require("./mongoose/todoStore");
    return new MongooseToDoStore();
  }

  static buildSequelizeToDoStore() {
    const SequelizeToDoStore = require("./sequelize/todoStore");
    return new SequelizeToDoStore();
  }
}
module.exports = ToDoStore;