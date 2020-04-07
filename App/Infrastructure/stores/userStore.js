class UserStore {
  static buildMongooseUserStore() {
    const MongooseUserStore = require("./mongoose/userStore");
    return new MongooseUserStore();
  }

  static buildSequelizeUserStore() {
    const SequelizeUserStore = require("./sequelize/userStore");
    return new SequelizeUserStore();
  }
}
module.exports = UserStore;