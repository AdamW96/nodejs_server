const Joi = require("joi");
//register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    firstname: Joi.string(),
    lastname: Joi.string(),
    username: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(2).max(50).required(),
    password: Joi.string().min(2).max(1024).required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(2).max(50).required(),
    password: Joi.string().min(2).max(1024).required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
