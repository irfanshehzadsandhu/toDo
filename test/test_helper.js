const mongoose = require("mongoose");
const db = require("../services/connect.database");
db();
//Called hooks which runs before something.
beforeEach(done => {
  console.log("Clear database");
  mongoose.connection.db.dropDatabase(function(err, result) {
    //this function runs after the drop is completed
    done(); //go ahead everything is done now.
  });
});
