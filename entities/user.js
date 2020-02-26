const bcrypt = require("bcrypt");
const uuidv1 = require("uuid/v1");
class UserEntity {
  constructor(userID, name, email) {
    this.userID = userID;
    this.name = name;
    this.email = email;
  }

  static create(params) {
    const userID = uuidv1();
    const name = params.name;
    const email = params.email;
    const userObj = new UserEntity(userID, name, email);
    return userObj;
  }

  static createFromObject(obj) {
    const userID = uuidv1();
    const name = obj.name;
    const email = obj.email;
    const userObj = new UserEntity(userID, name, email);
    return userObj;
  }

  async setPassword(password) {
    return await bcrypt.hash(password, 10);
  }
}

module.exports = UserEntity;
