const env = require("common-env")();
module.exports = env.getOrElseAll({
  email: {
    $default: "",
    $aliases: ["GMAIL"]
  },
  password: {
    $default: "",
    $aliases: ["GMAILPASSWORD"]
  }
});
