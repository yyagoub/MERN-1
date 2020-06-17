const Joi = require('@hapi/joi');

const registerValidation = (data) => {
  // create the schema
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });
  // validate the data using the schema
  return schema.validate(data);
};

const loginValidation = (data) => {
  // create the schema
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });
  // validate the data
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
