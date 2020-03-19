//require mongoose module
const mongoose = require("mongoose");

//require database URL from properties file
const { db } = require("../config");
//export this function and imported by server.js
module.exports.connect = function() {
  mongoose.connect(db.host);

  mongoose.connection.on("connected", function() {
    console.log("Mongoose default connection is open to " + db.host);
  });

  mongoose.connection.on("error", function(err) {
    console.log("Mongoose default connection has occurred" + err + " error");
  });

  mongoose.connection.on("disconnected", function() {
    console.log("Mongoose default connection is disconnected");
  });

  process.on("SIGINT", function() {
    mongoose.connection.close(function() {
      console.log(
        "Mongoose default connection is disconnected due to application termination"
      );
      process.exit(0);
    });
  });
};
module.exports.mongoose = mongoose;