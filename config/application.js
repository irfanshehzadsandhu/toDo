const env = require("common-env")();
module.exports = env.getOrElseAll({
  appName: {
    $default: "To Do Application",
    $aliases: ["APPNAME"]
  },

  myPrivateKey: {
    $default: "Lorem Ipsum",
    $aliases: ["MYPRIVATEKEY"]
  },
  port: {
    $default: "8080",
    $aliases: ["PORT", "PRODUCTIONPORT"]
  }
});
