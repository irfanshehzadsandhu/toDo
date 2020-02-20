// Current User
const currentuserService = require("../../../services/current.user.service");
const generateuserService = require("../../../services/generate.user.service");
exports.current = currentuserService.current;
// Generate User
exports.create = generateuserService.create;
