const UserEntity = require("../../Domain/entities/user");
const Jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { application } = require("../../Infrastructure/config");
const appError = require("../../../HTTP/errors/appError");
const eventEmitter = require("../../Infrastructure/utils/eventEmitter");
const UserFactory = require("../../Infrastructure/factories/userFactory");
const store = UserFactory.getUserFactory();

exports.current = async userID => {
  return await store.findByUserID(userID);
};

exports.authUser = async params => {
  const userIsPresent = await store.findByEmail(params.email);
  if (userIsPresent) {
    return { token: generateAuthToken(userIsPresent.userID), user: userIsPresent };
  }
  const user = UserEntity.createFromDetails(params); //Create a user entity first.
  await user.setPassword(params.password); //adding await due to bcrypt.
  const newUser = await store.add(user);
  eventEmitter.emit('userIsRegistered', newUser);
  return { token: generateAuthToken(user.userID), user: newUser };
};

exports.create = async params => {
  const userIsPresent = await store.findByEmail(params.email);
  if (userIsPresent) {
    throw new appError("Specified E-Mail is already taken", 400);
  }
  const user = UserEntity.createFromDetails(params);
  await user.setPassword(params.password); //adding await due to bcrypt.
  const newUser = await store.add(user);
  eventEmitter.emit('userIsRegistered', newUser);
  return { token: generateAuthToken(user.userID), user: newUser };
};

exports.updatePassword = async params => {
  const userFromDb = await store.findByUserID(params.userID);
  const user = UserEntity.createFromObject(userFromDb);
  await user.setPassword(params.password); //adding await due to bycrypt.
  const passwordUpdated = await store.update(user);
  if (passwordUpdated) {
    eventEmitter.emit('passwordUpdated', passwordUpdated);
    return { message: "Password updated successfully." };
  } else {
    throw new appError("Something went wrong.", 400);
  }
};

exports.createSession = async params => {
  const userIsPresent = await store.findByEmail(params.email);
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