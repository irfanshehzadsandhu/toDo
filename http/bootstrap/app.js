// app.js
const express = require("express");
// initialize our express app
const app = express();
const bodyParser = require("body-parser");
const homePageRoute = require("../routes/homepage.route");
const todosRoute = require("../routes/todo.route");
const usersRoute = require("../routes/user.route");
const db = require("../../services/connect.database");
db();
//set view engine
app.set("view engine", "jade");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", homePageRoute.homepage);
app.use("/api/v1/todos", todosRoute);
app.use("/api/v1/users", usersRoute);

app.set("view engine", "jade");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", homePageRoute.homepage);
app.use("/api/v1/todos", todosRoute);
app.use("/api/v1/users", usersRoute);
module.exports = app;
