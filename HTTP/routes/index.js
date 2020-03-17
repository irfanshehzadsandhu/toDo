const homePageRoute = require("./homepage");
const todosRoute = require("./todo");
const usersRoute = require("./user");
const sessionRoute = require("./session");
const passwordRoute = require("./password");
module.exports = app => {
  app.get("/", homePageRoute.homepage);
  app.use("/api/v1/todos", todosRoute);
  app.use("/api/v1/users", usersRoute);
  app.use("/api/v1/session", sessionRoute);
  app.use("/api/v1/password", passwordRoute);
};
