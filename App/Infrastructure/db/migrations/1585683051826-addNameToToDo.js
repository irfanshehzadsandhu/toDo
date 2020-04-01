const toDo = require("../../models/todo");
/**
 * Make any changes you need to make to the database here
 */
async function up() {
  console.log(await this('ToDo').updateMany({}, { name: "New field name is added" }));
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down() {
  console.log(await this('ToDo').updateMany({}, { '$unset': { name: true } }));
}

module.exports = { up, down };
