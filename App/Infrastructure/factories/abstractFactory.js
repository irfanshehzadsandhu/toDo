const appError = require("../../errors/appError");
class AbstractFactory {
  constructor() {
    if (this == AbstractFactory) {
      throw new appError("You can not instantiate an abstract factory.", 400);
    }
  }

  static getUserFactory() {
    throw new appError("You can not call an abstract factory.", 400);
  }

  static getToDoFactory() {
    throw new Error("You can not call an abstract factory.", 400);
  }
}
module.exports = AbstractFactory;