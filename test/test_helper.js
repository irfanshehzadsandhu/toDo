const db = require("../services/connect.database");
db.connect();
//Called hooks which runs before something.
beforeEach(done => {
  console.log("Clear database");
  db.mongoose.connection.db.dropDatabase(function(err, result) {
    //this function runs after the drop is completed
    done(); //go ahead everything is done now.
  });
});
