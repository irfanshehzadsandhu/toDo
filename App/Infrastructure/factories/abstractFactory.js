class AbstractFactory {
  constructor() {
    if (this == AbstractFactory) {
      throw new Error("You can not instantiate an abstract factory.");
    }
  }
  static loadStore() {
    throw new Error("You can not call method of abstract class from child class.");
  }
}
module.exports = AbstractFactory;