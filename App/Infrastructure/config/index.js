const application = require("./application");
const database = require("./database");
const google = require("./google");
const mailer = require("./gmail"); 
module.exports = {
  db: database,
  application: application,
  googleCredentials: google,
  mailer: mailer
};
