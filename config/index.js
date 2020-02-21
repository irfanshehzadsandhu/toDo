const developementKeys = require("./development");
const testKeys = require("./test");
if (process.env.NODE_ENV == "development") {
  module.exports = developementKeys;
}
if (process.env.NODE_ENV == "test") {
  module.exports = testKeys;
}
