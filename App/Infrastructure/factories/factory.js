const { db } = require("../config");
class Factory {
  static isMongooseDriver() {
    return db.driver == "sequelize"
  }

  static isSequelizeDriver() {
    return db.driver == "sequelize"
  }
}
module.exports = Factory;