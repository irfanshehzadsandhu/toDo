const expect = require("chai").expect;
const faker = require("faker");
const ValidationError = require('mongoose').Error.ValidationError;
const AppError = require("../../HTTP/errors/appError");
const sinon = require("sinon");
const userService = require("../../App/Domain/services/user");
const UserStore = require("../../App/Infrastructure/stores/userStore");
const userDetails = require("../helper/user");
const UserEntity = require("../../App/Domain/entities/user");
const eventEmitter = require("../../App/Infrastructure/utils/eventEmitter");


describe("User Service methods", async () => {
  beforeEach(async () => {
    const userObj = UserEntity.createFromDetails(userDetails);
    await userObj.setPassword(faker.internet.password());
    await UserStore.add(userObj);
  });

  it("expects user must not be created due to validation.", async () => {
    const userRequestBody = {
      name: "",
      email: "",
      password: ""
    };
    try {
      await userService.create(userRequestBody);
    } catch (e) {
      expect(e).to.be.an.instanceOf(ValidationError);
    }
  });

  it("expects user is already created.", async () => {
    const userRequestBody = {
      name: faker.name.findName(),
      email: userDetails.email,
      password: faker.internet.password()
    };
    try {
      await userService.create(userRequestBody);
    } catch (e) {
      expect(e).to.be.an.instanceOf(AppError);
    }
  });

  it("creates a user", async () => {
    const userRequestBody = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };
    // userIsRegistered event is stubbed in users test controller.
    const userResponse = await userService.create(userRequestBody);
    expect(userResponse.user).to.be.an.instanceOf(UserEntity);
  });

  it("should update user password", async () => {
    const usersList = await UserStore.first();
    const user = usersList[0];
    const userResponse = await userService.updatePassword({
      userID: user.userID,
      password: faker.internet.password()
    });
    expect(userResponse.message).eq("Password updated successfully.");
  });
});
