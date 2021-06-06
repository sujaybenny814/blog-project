const {Admin} = require("../model/admin")
const {Category} = require("../model/category")
const {errorMessage,successMessage} = require("../response/response")
const {Internal_Server_Error,Unprocessable_Entity,Conflict,Bad_Request,Success,Not_Found,Unauthorized}= require("../constants/statusCode")
const {Internal_Server_Error_message,User_Not_Found,Category_Already_Exists,Failed_To_Create_Category,Unauthorized_Message
    } = require("../constants/message")


exports.createCategory =(req,res)=>{
    const {name} = req.body
    const {userId} = req
    console.log(userId)
    try{
        Admin.findOne({_id:userId,active:"active"},(err,adminData)=>{
            if(err || !adminData)  return errorMessage(res,Unauthorized,Unauthorized_Message)
            else{
                Category.findOne({name},(err,categoryDetails)=>{
                    if(err || categoryDetails) return errorMessage(res,Bad_Request,Category_Already_Exists)
                    else{
                        Category.create({name},(err,data)=>{
                            if(err) return errorMessage(res,Bad_Request,Failed_To_Create_Category)
                            else return successMessage(res,Success,data)
                        })
                    }
                })
            }    
        })
    }
    catch(error){
        return errorMessage(res,Internal_Server_Error,Internal_Server_Error_message)

    }


}