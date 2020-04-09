require('dotenv').config()
const env = require("common-env")();
module.exports = env.getOrElseAll({
  host: {
    $default: "",
    $aliases: ["DB", "DATABASE_URL"] //will pick from .env file. If DB and DBHOST are not present in .env file then it will pick default value
  },
  driver: {
    $default: "",
    $aliases: ["DATABASEDRIVER"]
  }
});
