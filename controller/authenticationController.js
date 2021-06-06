
const {User} = require("../model/user")
const {Admin} = require("../model/admin")
const bcrypt = require("bcrypt")
const {errorMessage,successMessage} = require("../response/response")
const jwt = require("../security/jwt")
const {Internal_Server_Error,Unprocessable_Entity,Conflict,Bad_Request,Success,Not_Found,Unauthorized}= require("../constants/statusCode")
const {Internal_Server_Error_message,Email_Found,User_Not_Found,Email_Not_Found,Password_Wrong
    } = require("../constants/message")
    



const hashPassword =(password)=>{
    return new Promise((resolve,reject)=>{
        let saltRounds = 10
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                let responseData ={status:true}
                if(err) responseData.status =false
                else responseData.passwordHash = hash
                resolve(responseData) 
            });
        });
    })
}  

exports.signUp =(req,res)=>{
    try{
        const {name,email,password} = req.body
        User.findOne({email,active:"active"},async(err,userDetails)=>{
            if(err) return errorMessage(res,Internal_Server_Error,Internal_Server_Error_message)
            else if(userDetails) return errorMessage(res,Bad_Request,Email_Found)
            else{ 
                let {status,passwordHash} = await hashPassword(password)        
                if(status){
                    let userData ={name,email,password:passwordHash}
                    User.create(userData,(err,createdUserData)=>{
                        if(err) return errorMessage(res,Internal_Server_Error,Internal_Server_Error_message)
                        else{
                            delete createdUserData.password // to delete password
                            return successMessage(res,Success,createdUserData)
                        }
                    
                    })

                }
                else return errorMessage(res,Internal_Server_Error,Internal_Server_Error_message)
            }
        })
    }
    catch(error){
        return errorMessage(res,Internal_Server_Error,Internal_Server_Error_message)
    }
}

exports.signIn =(role)=>{
 let model = User
 if(role =="admin") model =Admin
        return function(req,res){
            try{
                const {email,password} = req.body
                model.findOne({email,active:"active"},async(err,userDetails)=>{
                    if(err || !userDetails) return errorMessage(res,Not_Found,Email_Not_Found)
                    else{
                        let hashPassword = userDetails.password
                        let status = await  bcrypt.compare(password, hashPassword);
                        if(status){
                            const {_id } =userDetails
                            let userData = {_id,email,role}
                            let token = await jwt.createToken(userData)
                            userData.token =token
                            return  successMessage(res,Success,userData)
                        } 
                        else
                        return errorMessage(res,Unauthorized,Password_Wrong)
                    }
                })
            }
            catch(error){
                return errorMessage(res,Internal_Server_Error,Internal_Server_Error_message)
            }
        }
    
}


