// app.js
const express = require("express");
const bodyParser = require("body-parser");
const todosRoute = require("./routes/todo.route"); // Imports routes for the todos
const usersRoute = require("./routes/user.route");
var properties = require("./config/properties");
var db = require("./config/database");
var myPrivatekey = require("./properties").MYPRIVATEKEY;
// initialize our express app
const app = express();
//use config module to get the privatekey, if no private key set, end the application
if (!myPrivatekey) {
  console.error("FATAL ERROR: myprivatekey is not defined.");
  process.exit(1);
}
// call the database connectivity function
db();
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1/todos", todosRoute);
app.use("/api/v1/users", usersRoute);
app.listen(properties.PORT, () => {
  console.log("Server is up and running on port number " + properties.PORT);
});
