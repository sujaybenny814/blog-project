const Joi = require('joi');

  exports.createCategory =  Joi.object({
        name:Joi.string().min(3).max(50).required()
  })
