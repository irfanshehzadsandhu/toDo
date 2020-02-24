// const expect = require("chai").expect;
// const faker = require("faker");
// const uuidv1 = require("uuid/v1");
// const User = require("../../models/user.model");
// const userService = require("../../services/user.service");
// const testEmail = "test@email.com";

// describe("User Service methods", async () => {
//   beforeEach(async () => {
//     const user = UserFactory.create;
//     let user = await User.create({
//       userID: uuidv1(),
//       name: faker.name.findName(),
//       email: testEmail,
//       password: faker.internet.password()
//     });
//   });

//   it("expects user must not be created due to validation.", async () => {
//     let userRequestBody = {
//       name: "",
//       email: "",
//       password: ""
//     };

//     let error = await userService.create(userRequestBody);
//     expect(error.status).eq(400);
//   });

//   it("expects user is already created.", async () => {
//     let userRequestBody = {
//       name: faker.name.findName(),
//       email: testEmail,
//       password: faker.internet.password()
//     };
//     let error = await userService.create(userRequestBody);
//     expect(error.status).eq(400);
//     expect(error.message).eq("User already registered.");
//   });

//   it("creates a user", async () => {
//     let userRequestBody = {
//       name: faker.name.findName(),
//       email: faker.internet.email(),
//       password: faker.internet.password()
//     };
//     let userResponse = await userService.create(userRequestBody);
//     expect(userResponse.status).eq(200);
//     expect(userResponse.message).eq("User created successfully.");
//   });
// });
