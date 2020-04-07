const Factory = require("./factory");
const ToDoStore = require("../stores/toDoStore");
class ToDoFactory extends Factory {
  static buildToDoStore() {
    if (this.isMongooseDriver) {
      ToDoStore.buildMongooseToDoStore();
    }
    else if (this.isSequelizeDriver) {
      ToDoStore.buildSequelizeToDoStore();
    }
  }

};
module.exports = ToDoFactory;