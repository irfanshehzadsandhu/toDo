const expect = require("chai").expect;
const faker = require("faker");
const UserStore = require("../../stores/userStore");
const userObj = require("../helper/user");
describe("User Store methods", async () => {
  const user = new UserStore(userObj);
  beforeEach(async () => {
    user.createFromObject(userObj);
    user.setUserID();
    user.password = await user.setPassword(faker.internet.password());
    await UserStore.add(user);
  });

  it("should find all users from store", async () => {
    const users = await UserStore.findAll();
    expect(users.length).eq(1);
  });

  it("should find user with given userID.", async () => {
    const userFromDb = await UserStore.findByUserID(user.userID);
    expect(userFromDb.userID).eq(user.userID);
  });

  it("should return latest users.", async () => {
    const latestUsers = await UserStore.first(); //In first we can pass integer e.g 2 or 10 for fetching latest documents
    expect(latestUsers[0].email).eq(user.email);
  });

  it("should return oldest users.", async () => {
    const oldestUsers = await UserStore.last(); //In last we can pass integer e.g 2 or 10 for fetching oldest documents
    expect(oldestUsers[0].email).eq(user.email);
  });

  it("should count the users.", async () => {
    const count = await UserStore.count();
    expect(count).eq(1);
  });

  it("should check user is present in Database.", async () => {
    const result = await UserStore.isPresent(user);
    expect(result).eq(true);
  });

  it("should find user with given email.", async () => {
    const userFromDb = await UserStore.findByEmail(userObj.email);
    expect(userFromDb.email).eq(user.email);
  });

  it("should update user with given details.", async () => {
    const params = {
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
    const userToDelete = await UserStore.findByUserID(user.userID);
    await UserStore.remove(userToDelete);
    const users = await UserStore.findAll();
    expect(users.length).eq(0);
  });
});
