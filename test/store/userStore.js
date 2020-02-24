const expect = require("chai").expect;
const faker = require("faker");
const UserStore = require("../../stores/userStore");

describe("User Service methods", () => {
  let user;
  beforeEach(async () => {
    let params = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };
    user = await UserStore.create(params);
  });

  it("should find all users from store", async () => {
    const users = await UserStore.findAll();
    expect(users.length).eq(1);
  });

  it("should find user with given userID.", async () => {
    const userFromDb = await UserStore.findByUserID(user.userID);
    expect(userFromDb.userID).eq(user.userID);
  });

  it("should find user with given email.", async () => {
    const userFromDb = await UserStore.findByEmail(user.email);
    expect(userFromDb.email).eq(user.email);
  });

  it("should update user with given details.", async () => {
    let params = {
      userID: user.userID,
      name: faker.name.findName(),
      email: faker.internet.email()
    };
    const updatedUserInfo = await UserStore.update(params);
    expect(updatedUserInfo.userID).eq(params.userID);
    expect(updatedUserInfo.name).eq(params.name);
    expect(updatedUserInfo.email).eq(params.email);
  });

  it("should delete user with given userID.", async () => {
    await UserStore.remove(user.userID);
    const users = await UserStore.findAll();
    expect(users.length).eq(0);
  });
});
