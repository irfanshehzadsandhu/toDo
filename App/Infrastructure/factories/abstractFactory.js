const appError = require("../../../HTTP/errors/appError");
class AbstractFactory {
  constructor() {
    if (this == AbstractFactory) {
      throw new appError("You can not instantiate an abstract factory.", 400);
    }
  }

  static getUserStore() {
    throw new appError("You can not call an abstract factory.", 400);
  }

  static getToDoStore() {
    throw new Error("You can not call an abstract factory.", 400);
  }
}
module.exports = AbstractFactory;