const Factory = require("./factory");
const UserStore = require("../stores/userStore");
class UserFactory extends Factory {
  static buildUserStore() {
    if (this.isMongooseDriver) {
      UserStore.buildMongooseUserStore();
    }
    else if (this.isSequelizeDriver) {
      UserStore.buildSequelizeUserStore();
    }
  }
};
module.exports = UserFactory;