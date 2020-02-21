const expect = require("chai").expect;
const faker = require("faker");
const User = require("../../models/user.model");
const uuidv1 = require("uuid/v1");
const testEmail = "test@email.com";
describe("Creating a user", async () => {
  beforeEach(async () => {
    let user = await User.create({
      userID: uuidv1(),
      name: faker.name.findName(),
      email: testEmail,
      password: faker.internet.password()
    });
  });

  it("creates a user", () => {
    const user = new User({
      userID: uuidv1(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    });
    user.save().then(() => {
      expect(user.isNew).to.false;
    });
  });

  it("expects user is already created.", async () => {
    let user = await User.findOne({ email: testEmail });
    expect(user.email).to.eq(testEmail);
  });
});
