const validate = require("../validators/userValidator");
const UserStore = require("../stores/userStore");
const UserEntity = require("../entities/user");
exports.current = userID => {
  const user = UserStore.findByUserID(userID);
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
  //Create a user from entity first
  const user = UserEntity.create(params);
  user.password = await user.setPassword(params.password);
  const newUser = await UserStore.add(user);
  if (newUser.isCreated) {
    return {
      status: 200,
      message: "User created successfully.",
      user: newUser
    };
  } else {
    return {
      status: 400
    };
  }
};

exports.updatePassword = async params => {
  const user = UserEntity.update(params);
  user.password = await user.setPassword(params.password);
  const passwordUpdatedInfo = await UserStore.update(user);
  if (passwordUpdatedInfo.isUpdated) {
    return { status: 200, message: "Password updated successfully." };
  } else {
    return { status: 400, message: user.error };
  }
};

// exports.generateAuthToken = user => {
//   const token = jwt.sign(
//     { _id: user._id, isAdmin: user.isAdmin },
//     configuration.MYPRIVATEKEY
//   );
//   return token;
// };
