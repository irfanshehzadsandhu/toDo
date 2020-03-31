const toDo = require("../../models/todo");
/**
 * Make any changes you need to make to the database here
 */
async function up() {
  const result = toDo.update({}, { name: "New field name is added" });
  console.log(result);
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down() {
  const result = toDo.update({}, { '$unset': { name: "" } });
  console.log(result);
}

module.exports = { up, down };
