const mongoose = require("mongoose");

const { db } = require("./App/Infrastructure/config");
const ToDo = require("./App/Infrastructure/seeders/toDo");

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
module.exports.seedersList = {
  ToDo
};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
module.exports.connect = async () =>
  await mongoose.connect(db.host, { useNewUrlParser: true });
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
module.exports.dropdb = async () => mongoose.connection.db.dropDatabase();
