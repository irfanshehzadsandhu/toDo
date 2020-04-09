const Factory = require("./factory");
const UserStore = require("../stores/userStore");
class UserFactory extends Factory {
  static buildUserStore() {
    if (this.isMongooseDriver()) {
      return UserStore.buildMongooseUserStore();
    }
    else if (this.isSequelizeDriver()) {
      return UserStore.buildSequelizeUserStore();
    }
  }
};
module.exports = UserFactory;