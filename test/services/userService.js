const expect = require("chai").expect;
const faker = require("faker");
const userService = require("../../services/userService");
const UserStore = require("../../stores/userStore");
const testEmail = "test@email.com";

describe("User Service methods", async () => {
  beforeEach(async () => {
    let params = {
      name: faker.name.findName(),
      email: testEmail,
      password: faker.internet.password()
    };
    user = await UserStore.create(params);
  });

  it("expects user must not be created due to validation.", async () => {
    let userRequestBody = {
      name: "",
      email: "",
      password: ""
    };

    let error = await userService.create(userRequestBody);
    expect(error.status).eq(400);
  });

  it("expects user is already created.", async () => {
    let userRequestBody = {
      name: faker.name.findName(),
      email: testEmail,
      password: faker.internet.password()
    };
    let error = await userService.create(userRequestBody);
    expect(error.status).eq(400);
    expect(error.message).eq("User already registered.");
  });

  it("creates a user", async () => {
    let userRequestBody = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };
    let userResponse = await userService.create(userRequestBody);
    expect(userResponse.status).eq(200);
    expect(userResponse.message).eq("User created successfully.");
  });
});
