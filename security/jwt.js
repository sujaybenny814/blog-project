const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY
const {errorMessage,successMessage} = require("../response/response")
const {Internal_Server_Error,Unauthorized}= require("../constants/statusCode")
const {Internal_Server_Error_message,Unauthorized_Message
    }  = require("../constants/message")

exports.createToken = (data)=>{
    return jwt.sign(data,secretKey,{expiresIn:"1h"})
}
exports.verifyToken = (req,res,next)=>{
    try{
        let token = req.headers["authorization"] 
        token = token && token.split("Bearer")[1] && token.split("Bearer")[1].trim()
        if(token){
            return jwt.verify(token,secretKey,(err,tokenDetails)=>{
            if(err)
            return errorMessage(res,Unauthorized,Unauthorized_Message)
            else {
                const {_id,email,role} =tokenDetails
                req.userId=_id
                req.email=email
                req.role=role
                next()
            } 
        })
        }
        else
        return errorMessage(res,Unauthorized,Unauthorized_Message)
    }
    catch(error){
        return errorMessage(res,Internal_Server_Error,Internal_Server_Error_message)
    }
}