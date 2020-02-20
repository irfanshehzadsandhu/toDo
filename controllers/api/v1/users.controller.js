// Current User
currentuserService = require("../../../services/current.user.service");
generateuserService = require("../../../services/generate.user.service");
exports.current = currentuserService.current;
// Generate User
exports.create = generateuserService.create;
