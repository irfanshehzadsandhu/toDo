// app.js
const express = require("express");
// initialize our express app
const app = express();
const bodyParser = require("body-parser");
const db = require("../../services/connect.database");
const routes = require("../routes");
// Verify this is right approach
routes(app);
//connect to database
db();
//set view engine
app.set("view engine", "jade");
app.use(bodyParser.urlencoded({ extended: true }));
module.exports = app;
