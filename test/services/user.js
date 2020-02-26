const expect = require("chai").expect;
const faker = require("faker");
const userService = require("../../services/user");
const UserStore = require("../../stores/userStore");
const userDetails = require("../helper/user");
const UserEntity = require("../../entities/user");
describe("User Service methods", async () => {
  const userObj = UserEntity.createFromObject(userDetails);
  beforeEach(async () => {
    userObj.password = await userObj.setPassword(faker.internet.password());
    await UserStore.add(userObj);
  });

  it("expects user must not be created due to validation.", async () => {
    const userRequestBody = {
      name: "",
      email: "",
      password: ""
    };

    const error = await userService.create(userRequestBody);
    expect(error.status).eq(400);
  });

  it("expects user is already created.", async () => {
    const userRequestBody = {
      name: faker.name.findName(),
      email: userObj.email,
      password: faker.internet.password()
    };
    const error = await userService.create(userRequestBody);
    expect(error.status).eq(400);
    expect(error.message).eq("User already registered.");
  });

  it("creates a user", async () => {
    const userRequestBody = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };
    const userResponse = await userService.create(userRequestBody);
    expect(userResponse.status).eq(200);
    expect(userResponse.message).eq("User created successfully.");
  });

  it("should update user password", async () => {
    const usersList = await UserStore.first();
    const user = usersList[0];
    const userResponse = await userService.updatePassword({
      userID: user.userID,
      password: faker.internet.password()
    });
    expect(userResponse.status).eq(200);
  });
});
