const Joi = require('joi');

  exports.signUp =  Joi.object({
        name:Joi.string().min(3).max(50).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(8).max(50).required()
  })

  exports.signIn =  Joi.object({
      email:Joi.string().email().required(),
      password:Joi.string().min(8).max(50).required()
})

  


