const app = require("../app");
const properties = require("../config/properties");
app.listen(properties.PORT, () => {
  console.log("Server is up and running on port number " + properties.PORT);
});
