const Joi = require("joi");

exports.register = Joi.object().keys({
  id: Joi.number().integer().min(1).max(99),

  name: Joi.string().required(),

  email: Joi.string().required(),

  password: Joi.string().required().min(3).max(10),

  phone: Joi.string().required(),

  level: Joi.required(),
});
