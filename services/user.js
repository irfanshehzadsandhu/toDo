const validate = require("../validators/userValidator");
const UserStore = require("../stores/userStore");
const UserEntity = require("../entities/user");
const Jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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
  await user.setPassword(params.password);
  await UserStore.add(user);
  return { token: generateAuthToken(user.userID) };
};

exports.updatePassword = async params => {
  const userFromDb = await UserStore.findByUserID(params.userID);
  const user = UserEntity.createFromObject(userFromDb);
  await user.setPassword(params.password);
  //return boolean value from UserStore only
  const passwordUpdatedInfo = await UserStore.update(user);
  if (passwordUpdatedInfo.isUpdated) {
    return { status: 200, message: "Password updated successfully." };
  } else {
    return { status: 403, message: user.error };
  }
};

exports.createSession = async params => {
  const userIsPresent = await UserStore.findByEmail(params.email);
  if (!userIsPresent) {
    return { code: 403, message: "Invalid Email" };
  }
  //Match password
  if (!bcrypt.compare(params.password, userIsPresent.password)) {
    return { code: 403, message: "Invalid Password" };
  }

  return { token: generateAuthToken(userIsPresent.userID) };
};

function generateAuthToken(userID) {
  return Jwt.sign({ userID: userID }, app.myPrivateKey);
}
