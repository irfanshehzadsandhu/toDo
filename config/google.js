const env = require("common-env")();
module.exports = env.getOrElseAll({
  googleClientId: {
    $default:
      "4415507497-fcqom4movlv7880km9lbte9557kpjsm7.apps.googleusercontent.com",
    $aliases: ["GOOGLECLIENTID"]
  },

  googleClientSecret: {
    $default: "_FeBqrH1eQE8X7CDra-Plr_8",
    $aliases: ["GOOGLECLIENTSECRET"]
  },
  redirect: {
    $default: "http://localhost:3000/api/v1/session/googleAuth",
    $aliases: ["REDIRECT"]
  }
});
