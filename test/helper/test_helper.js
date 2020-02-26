require("dotenv").config();
const db = require("../../models/mongoose");

db.connect();
//Called hooks which runs before something.
beforeEach(done => {
  console.log("Clear database");
  try {
    db.mongoose.connection.db.dropDatabase(function(err, result) {
      //this function runs after the drop is completed
      done(); //go ahead everything is done now.
    });
  } catch (e) {
    done();
    console.log(e);
  }
});
