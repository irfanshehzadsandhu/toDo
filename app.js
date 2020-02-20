// app.js
const express = require("express");
const bodyParser = require("body-parser");
const homePageRoute = require("./routes/homepage.route");
const todosRoute = require("./routes/todo.route"); // Imports routes for the todos
const usersRoute = require("./routes/user.route");
const db = require("./config/database");
const checkPrivateKey = require("./config/privatekey");
// initialize our express app
const app = express();
//check private key
checkPrivateKey();
// call the database connectivity function
db();
//set view engine
app.set("view engine", "jade");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", homePageRoute.homepage);
app.use("/api/v1/todos", todosRoute);
app.use("/api/v1/users", usersRoute);
module.exports = app;
