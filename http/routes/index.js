const homePageRoute = require("./homepage");
const todosRoute = require("./todo");
const usersRoute = require("./user");
module.exports = app => {
  app.get("/", homePageRoute.homepage);
  app.use("/api/v1/todos", todosRoute);
  app.use("/api/v1/users", usersRoute);
};
