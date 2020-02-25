// const expect = require("chai").expect;
// const faker = require("faker");
// const uuidv1 = require("uuid/v1");
// const ToDo = require("../../models/todo.model");

// describe("ToDo Service methods", async () => {
//   let todoInDb;
//   beforeEach(async () => {
//     todoInDb = await ToDo.create({
//       toDoID: uuidv1(),
//       description: faker.lorem.paragraph(),
//       completed: faker.random.boolean()
//     });
//   });

//   it("creates a todo", () => {
//     let todo = new ToDo({
//       toDoID: uuidv1(),
//       description: faker.lorem.paragraph(),
//       completed: faker.random.boolean()
//     });
//     todo.save().then(() => {
//       expect(todo.isNew).to.false;
//     });
//   });

//   it("finds a todo", async () => {
//     let todo = await ToDo.findOne({ toDoID: todoInDb.toDoID });
//     expect(todo.toDoID).eq(todoInDb.toDoID);
//   });

//   it("update a todo", async () => {
//     let description = faker.lorem.paragraph();
//     let completed = faker.random.boolean();

//     let todo = await ToDo.findOneAndUpdate(
//       { toDoID: todoInDb.toDoID },
//       {
//         description: description,
//         completed: completed
//       }
//     );
//     //expect(todo.description).eq(description);
//     expect(todo.completed).eq(completed);
//   });
// });
