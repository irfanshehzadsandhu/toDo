//Use spies and stubs to properly unit test stores
const expect = require("chai").expect;
const faker = require("faker");
const sinon = require("sinon");
const UserStore = require("../../App/Infrastructure/stores/userStore");
const userDetails = require("../factories/user");
const UserEntity = require("../../App/Domain/entities/user");
describe("User Store methods", async () => {
  beforeEach(async () => {
    const userObj = UserEntity.createFromDetails(userDetails);
    await userObj.setPassword(faker.internet.password());
    await UserStore.add(userObj);
  });

  it("should find all users from store", async () => {
    const mock = sinon.mock(UserStore);
    mock.expects("findAll").once();
    await UserStore.findAll();
    mock.verify();
    mock.restore();
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
