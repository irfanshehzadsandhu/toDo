const expect = require("chai").expect;
const faker = require("faker");
const uuidv1 = require("uuid/v1");
const validate = require("../../validators/user.validator");
const User = require("../../models/user.model");
const userService = require("../../services/user.service");
const testEmail = "test@email.com";

describe("User Service methods", async () => {
  beforeEach(async () => {
    let user = await User.create({
      userID: uuidv1(),
      name: faker.name.findName(),
      email: testEmail,
      password: faker.internet.password()
    });
  });

  it("expects user must not be created due to validation.", async () => {
    const userRequestBody = {
      userID: "",
      name: "",
      email: "",
      password: ""
    };
    const { error } = validate(userRequestBody);
    expect(error).to.exist.and.be.instanceof(Error);
  });

  it("expects user is already created.", async () => {
    let user = await User.findOne({ email: testEmail });
    expect(user.email).to.eq(testEmail);
  });

  it("creates a user", () => {
    let user = new User({
      userID: uuidv1(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    });
    user.save().then(() => {
      expect(user.isNew).to.false;
    });
  });

  it("generates oauth token", async () => {
    let user = User.findOne({ email: testEmail });
    let token = await userService.generateAuthToken(user);
    expect(token).to.exist;
  });
});
