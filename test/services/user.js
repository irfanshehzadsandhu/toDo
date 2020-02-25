const expect = require("chai").expect;
const faker = require("faker");
const userService = require("../../services/user");
const UserStore = require("../../stores/userStore");
const bcrypt = require("bcrypt");
const uuidv1 = require("uuid/v1");
const testEmail = "test@email.com";

describe("User Service methods", async () => {
  beforeEach(async () => {
    const params = {
      userID: uuidv1(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: await bcrypt.hash(faker.internet.password(), 10)
    };
    await UserStore.add(params);
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
      email: testEmail,
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
