const expect = require("chai").expect;
const faker = require("faker");
const userService = require("../../services/user");
const UserStore = require("../../stores/userStore");
const userDetails = require("../helper/user");
const UserEntity = require("../../entities/user");
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

    const error = await userService.create(userRequestBody);
    expect(error.errorMessage).eq('"name" is not allowed to be empty');
  });

  it("expects user is already created.", async () => {
    const userRequestBody = {
      name: faker.name.findName(),
      email: userDetails.email,
      password: faker.internet.password()
    };
    const error = await userService.create(userRequestBody);
    expect(error.errorMessage).eq("User already registered.");
  });

  it("creates a user", async () => {
    const userRequestBody = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };
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
