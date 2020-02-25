const expect = require("chai").expect;
const faker = require("faker");
const userService = require("../../services/user");
const UserStore = require("../../stores/userStore");
const userObj = require("../helper/user");
describe("User Service methods", async () => {
  const user = new UserStore(userObj);
  beforeEach(async () => {
    user.createFromObject(userObj);
    user.setUserID();
    user.password = await user.setPassword(faker.internet.password());
    await UserStore.add(user);
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
});
