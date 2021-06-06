const Joi = require('joi');
const {errorMessage} = require("../response/response")
const {Internal_Server_Error,Unprocessable_Entity}= require("../constants/statusCode")
const {Internal_Server_Error_message} = require("../constants/message")

exports.schemaValidation = function(schema){
    return  async function(req, res, next){   
            try{
             const body = req.body   
             const {error} =  await schema.validate(body) 
             if(error){
                 const {details} =error
                 if(details.length){
                     return errorMessage(res,Unprocessable_Entity,error.details[0].message)
                 }
                 else{
                    return errorMessage(res,Unprocessable_Entity,error)
                 }
             }
             else{
                next()
             }
            }
            catch(error){
                return errorMessage(res,Internal_Server_Error,Internal_Server_Error_message)
            }
   
    }
}