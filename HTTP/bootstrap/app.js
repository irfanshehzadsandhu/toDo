require("dotenv").config();
// app.js
const express = require("express");
// initialize our express app
const app = express();
const bodyParser = require("body-parser");
const dataBaseConnection = require("../../App/Infrastructure/models/dataBaseConnection");
const apiRoutes = require("../routes/api/v1/apiRoutes");
app.set("view engine", "jade");
app.use(bodyParser.urlencoded({ extended: true })); //This must be added before defining routes otherwise you will be get exception "undefined" in form body
app.use(apiRoutes);
dataBaseConnection();
module.exports = app;
