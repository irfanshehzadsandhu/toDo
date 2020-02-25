const bcrypt = require("bcrypt");
const uuidv1 = require("uuid/v1");
const validate = require("../validators/userValidator");
const UserStore = require("../stores/userStore");

exports.current = user_id => {
  const user = UserStore.findByUserID(user_id);
  return user;
};

exports.create = async params => {
  // validate the request body first
  const { error } = validate(params);
  if (error) {
    return { status: 400, message: error.details[0].message };
  }

  //find an existing user
  const userIsPresent = await UserStore.findByEmail(params.email);

  if (userIsPresent) {
    return { status: 400, message: "User already registered." };
  }
  params.userID = uuidv1();
  params.password = await bcrypt.hash(params.password, 10);
  const newUser = UserStore.add(params);
  return { status: 200, message: "User created successfully.", user: newUser };
};

// exports.generateAuthToken = user => {
//   const token = jwt.sign(
//     { _id: user._id, isAdmin: user.isAdmin },
//     configuration.MYPRIVATEKEY
//   );
//   return token;
// };
