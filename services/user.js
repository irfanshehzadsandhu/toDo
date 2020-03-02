const validate = require("../validators/userValidator");
const UserStore = require("../stores/userStore");
const UserEntity = require("../entities/user");
const Jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { app } = require("../config");

exports.current = async userID => {
  return await UserStore.findByUserID(userID);
};

exports.create = async params => {
  // validate the request body first
  const { error } = validate(params);
  if (error) {
    return { errorMessage: error.details[0].message };
  }
  //find an existing user
  const userIsPresent = await UserStore.findByEmail(params.email);
  if (userIsPresent) {
    return { errorMessage: "User already registered." };
  }
  //Create a user from entity first
  const user = UserEntity.createFromDetails(params); //Create a user entity first.
  await user.setPassword(params.password); //adding await due to bycrypt.
  const newUser = await UserStore.add(user);
  return { token: generateAuthToken(user.userID), user: newUser };
};

exports.updatePassword = async params => {
  const userFromDb = await UserStore.findByUserID(params.userID);
  const user = UserEntity.createFromObject(userFromDb);
  await user.setPassword(params.password); //adding await due to bycrypt.
  const passwordUpdated = await UserStore.update(user);
  if (passwordUpdated) {
    return { code: 200, message: "Password updated successfully." };
  } else {
    return { code: 403, message: user.error };
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
