const Joi = require("joi");
//function to validate todo
function validateToDo(todo) {
  const schema = {
    completed: Joi.boolean().required(),
    description: Joi.string()
  };

  return Joi.validate(todo, schema);
}
module.exports = validateToDo;
