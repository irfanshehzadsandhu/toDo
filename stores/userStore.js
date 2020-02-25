const bcrypt = require("bcrypt");
const uuidv1 = require("uuid/v1");
const User = require("../models/user");
class UserStore {
  constructor(params) {
    this.name = params.name;
    this.email = params.email;
  }
  //for tests
  createFromObject(obj) {
    this.name = obj.name;
    this.email = obj.email;
  }

  async setPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  setUserID() {
    this.userID = uuidv1();
  }
  //TODO
  //static async exists()
  //static async first(numberOfDocuments) number of documents should be an integer
  //static async last(numberOfDocuments) number of documents should be an integer
  //static async findOrCreate() find a document in a collection if not found create one
  static async add(user) {
    //create() for saving many documents at a time. Create is basically using save() for each document
    return await User.create(user);
  }

  static async findAll() {
    //find() returns an array of documents
    return await User.find({});
  }

  static async findByUserID(userID) {
    //findOne() returns at most one document and findMany will return all documents matching the query.
    return await User.findOne({ userID: userID });
  }

  static async findByEmail(email) {
    return await User.findOne({ email: email });
  }

  static async update(user) {
    //updateOne() returns information of updated document e.g { n: 1, nModified: 0, ok: 1 }
    // findOneAndUpdate() returns updated document.
    const updatedUser = await User.findOneAndUpdate(
      { userID: user.userID },
      user,
      function() {}
    );
    return updatedUser;
  }
  static async remove(user) {
    //deleteOne will delete at most document matching the query.
    await User.deleteOne(user);
  }
}
module.exports = UserStore;
