const validate = require("../validators/userValidator");
const UserStore = require("../stores/userStore");
const UserEntity = require("../entities/user");
const Jwt = require("jsonwebtoken");
const { app } = require("../config");
const { myPrivateKey } = require("../config");
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
  const user = UserEntity.create(params); //Create a user entity first.
  user.password = await user.setPassword(params.password);
  const newUser = await UserStore.add(user);
  return newUser;
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

exports.generateAuthToken = userID => {
  const token = Jwt.sign({ userID: userID }, app.myPrivateKey);
  return token;
};
