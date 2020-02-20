// Current User
const currentUserService = require("../../../../services/current.user.service");
const generateUserService = require("../../../../services/generate.user.service");
exports.current = currentUserService.current;
// Generate User
exports.create = generateUserService.create;
