const Factory = require("./factory");
const ToDoStore = require("../stores/toDoStore");
class ToDoFactory extends Factory {
  static buildToDoStore() {
    if (this.isMongooseDriver) {
      return ToDoStore.buildMongooseToDoStore();
    }
    else if (this.isSequelizeDriver) {
      return ToDoStore.buildSequelizeToDoStore();
    }
  }

};
module.exports = ToDoFactory;