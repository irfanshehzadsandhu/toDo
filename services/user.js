const validate = require("../validators/userValidator");
const UserStore = require("../stores/userStore");
const UserEntity = require("../entities/user");
const Jwt = require("jsonwebtoken");
const { app } = require("../config");

exports.current = async userID => {
  const user = await UserStore.findByUserID(userID);
  return UserEntity.createFromObject(user);
};

exports.create = async params => {
  // validate the request body first
  const { error } = validate(params);
  if (error) {
    return { status: 403, message: error.details[0].message };
  }

  //find an existing user
  const userIsPresent = await UserStore.findByEmail(params.email);

  if (userIsPresent) {
    return { status: 403, message: "User already registered." };
  }
  //Create a user from entity first
  const user = UserEntity.createFromDetails(params); //Create a user entity first.
  user.password = await user.setPassword(params.password);
  const newUser = await UserStore.add(user);
  return newUser;
};

exports.updatePassword = async params => {
  const userFromDb = await UserStore.findByUserID(params.userID);
  const user = UserEntity.createFromObject(userFromDb);
  user.password = await user.setPassword(params.password);
  const passwordUpdatedInfo = await UserStore.update(user);
  if (passwordUpdatedInfo.isUpdated) {
    return { status: 200, message: "Password updated successfully." };
  } else {
    return { status: 403, message: user.error };
  }
};

exports.generateAuthToken = userID => {
  const token = Jwt.sign({ userID: userID }, app.myPrivateKey);
  return token;
};
