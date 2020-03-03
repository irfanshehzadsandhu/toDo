var env = require("common-env")();
module.exports = env.getOrElseAll({
  host: {
    $default: "mongodb://localhost:27017/todo_application",
    $aliases: ["DB", "DBHOST"] //will pick from .env file. If DB and DBHOST are not present in .env file then it will pick default value
  }
});
