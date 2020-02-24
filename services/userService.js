//const jwt = require("jsonwebtoken");
//const configuration = require("../config");
const validate = require("../validators/user.validator");
const UserStore = require("../stores/userStore");
// exports.current = user_id => {
//   const user = User.findById(user_id).select("-password");
//   return user;
// };

exports.create = async params => {
  // validate the request body first
  let user;
  const { error } = validate(params);
  //if (error) return res.status(400).send(error.details[0].message);
  if (error) {
    return { status: 400, message: error.details[0].message };
  }

  //find an existing user
  user = await UserStore.findByEmail(params.email);
  //if (user) return res.status(400).send("User already registered.");
  if (user) {
    return { status: 400, message: "User already registered." };
  }

  user = UserStore.create(params);
  return { status: 200, message: "User created successfully.", user: user };
};

// exports.generateAuthToken = user => {
//   const token = jwt.sign(
//     { _id: user._id, isAdmin: user.isAdmin },
//     configuration.MYPRIVATEKEY
//   );
//   return token;
// };
