const homePageRoute = require("./homepage.route");
const todosRoute = require("./todo.route");
const usersRoute = require("./user.route");
module.exports = app => {
  app.get("/", homePageRoute.homepage);
  app.use("/api/v1/todos", todosRoute);
  app.use("/api/v1/users", usersRoute);
};
