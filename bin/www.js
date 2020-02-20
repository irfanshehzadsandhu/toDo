const app = require("../app");
const bodyParser = require("body-parser");
const homePageRoute = require("../routes/homepage.route");
const todosRoute = require("../routes/todo.route");
const usersRoute = require("../routes/user.route");
const db = require("../config/database");
const properties = require("../config/properties");
// call the database connectivity function
db();
//const checkPrivateKey = require("./config/privatekey");
//check private key
//checkPrivateKey();

//set view engine
app.set("view engine", "jade");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", homePageRoute.homepage);
app.use("/api/v1/todos", todosRoute);
app.use("/api/v1/users", usersRoute);

app.listen(properties.PORT, () => {
  console.log("Server is up and running on port number " + properties.PORT);
});
