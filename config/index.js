const application = require("./application");
const database = require("./database");
const google = require("./google");
module.exports = {
  db: database,
  application: application,
  googleCredentials: google
};
