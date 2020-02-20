const Joi = require("joi");
//function to validate todo
function validateToDo(todo) {
  const schema = {
    completed: Joi.boolean().required()
  };

  return Joi.validate(todo, schema);
}
module.exports = validateToDo;
