// app.js
const express = require("express");
// initialize our express app
const app = express();
const bodyParser = require("body-parser");
const db = require("../../services/connect.database");
const routes = require("../routes");
//set view engine
app.set("view engine", "jade");
app.use(bodyParser.urlencoded({ extended: true })); //This must be added before defining routes otherwise you will be get exception "undefined" in form body
routes(app); // Verify !!!!! this is right approach?????
//connect to database
db.connect();
module.exports = app;
