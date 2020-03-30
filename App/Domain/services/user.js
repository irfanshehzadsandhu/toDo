const UserStore = require("../../Infrastructure/stores/userStore");
const UserEntity = require("../../Domain/entities/user");
const Jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { application } = require("../../Infrastructure/config");
const appError = require("../../../HTTP/errors/appError");
const eventEmitter = require("../../Infrastructure/utils/eventEmitter");

exports.current = async userID => {
  return await UserStore.findByUserID(userID);
};

exports.authUser = async params => {
  //find an existing user
  const userIsPresent = await UserStore.findByEmail(params.email);
  if (userIsPresent) {
    return { token: generateAuthToken(userIsPresent.userID), user: userIsPresent };
  }
  const user = UserEntity.createFromDetails(params); //Create a user entity first.
  await user.setPassword(params.password); //adding await due to bcrypt.
  const newUser = await UserStore.add(user);
  eventEmitter.emit('userIsRegistered', newUser);
  return { token: generateAuthToken(user.userID), user: newUser };
};

exports.create = async params => {
  //find an existing user
  const userIsPresent = await UserStore.findByEmail(params.email);
  if (userIsPresent) {
    throw new appError("Specified E-Mail is already taken", 400);
  }
  //Create a user from entity first
  const user = UserEntity.createFromDetails(params);
  await user.setPassword(params.password); //adding await due to bcrypt.
  const newUser = await UserStore.add(user);
  eventEmitter.emit('userIsRegistered', newUser);
  return { token: generateAuthToken(user.userID), user: newUser };
};

exports.updatePassword = async params => {
  const userFromDb = await UserStore.findByUserID(params.userID);
  const user = UserEntity.createFromObject(userFromDb);
  await user.setPassword(params.password); //adding await due to bycrypt.
  const passwordUpdated = await UserStore.update(user);
  if (passwordUpdated) {
    return { message: "Password updated successfully." };
  } else {
    throw new appError("Something went wrong.", 400);
  }
};

exports.createSession = async params => {
  const userIsPresent = await UserStore.findByEmail(params.email);
  if (!userIsPresent) {
    throw new appError("Invalid Email.", 400);
  }
  //Match password
  if (!bcrypt.compare(params.password, userIsPresent.password)) {
    throw new appError("Invalid Password.", 400);
  }

  return { token: generateAuthToken(userIsPresent.userID) };
};

function generateAuthToken(userID) {
  return Jwt.sign({ userID: userID }, application.myPrivateKey);
}