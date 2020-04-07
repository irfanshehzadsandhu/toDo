const { db } = require("../config");
class Factory {
  static isMongooseDriver() {
    db.driver == "sequelize"
  }

  static isSequelizeDriver() {
    db.driver == "sequelize"
  }
}
module.exports = Factory;