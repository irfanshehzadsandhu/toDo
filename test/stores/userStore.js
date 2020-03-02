const expect = require("chai").expect;
const faker = require("faker");
const UserStore = require("../../stores/userStore");
const userDetails = require("../helper/user");
const UserEntity = require("../../entities/user");
describe("User Store methods", async () => {
  beforeEach(async () => {
    const userObj = UserEntity.createFromDetails(userDetails);
    await userObj.setPassword(faker.internet.password());
    await UserStore.add(userObj);
  });

  it("should find all users from store", async () => {
    const users = await UserStore.findAll();
    expect(users.length).eq(1);
  });

  it("should find user with given userID.", async () => {
    const latestUsers = await UserStore.first();
    const user = latestUsers[0];
    const userFromDb = await UserStore.findByUserID(user.userID);
    expect(userFromDb).to.be.instanceOf(UserEntity);
  });

  it("should return oldest users.", async () => {
    const oldestUsers = await UserStore.last(); //In last we can pass integer e.g 2 or 10 for fetching oldest documents
    expect(oldestUsers.length).eq(1);
  });

  it("should count the users.", async () => {
    const count = await UserStore.count();
    expect(count).eq(1);
  });

  it("should check user is present in Database.", async () => {
    const latestUsers = await UserStore.first();
    const user = latestUsers[0];
    const result = await UserStore.isPresent(user);
    expect(result).eq(true);
  });
});
